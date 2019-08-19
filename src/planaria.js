const {planaria, planarium} = require('neonplanaria');
const bitquery = require('bitquery');
const MongoClient = require('mongodb');
const mongoose = require('mongoose');
const Question = require('./entities/question/model');

const connect = function(cb) {
    MongoClient.connect("mongodb://localhost:27017", {useNewUrlParser: true}, function(err, client) {
        if (err) {
            console.log("retrying...");
            setTimeout(function() {
                connect(cb);
            }, 1000)
        } else {
            db = client.db("enverDB");
            cb();
        }
    })
};

planarium.start({
    name: "planaria",
    port: 5001,
    onstart: async function() {
        let db = await bitquery.init({ url: "mongodb://localhost:27017", address: "enverDB" });
        return { db: db };
    },
    onquery: function(e) {
        let code = Buffer.from(e.query, 'base64').toString();
        let req = JSON.parse(code);
        if (req.q && req.q.find) {
            e.core.db.read("enverDB", req).then(function(result) {
                e.res.json(result)
            })
        } else {
            e.res.json([])
        }
    }
});

planaria.start({
    filter: {
        "from": 596160,
        "q": {
            "find": {"out.s2": "1HUqKEetMXpByShDnybNNGBhZMcTjtE6RG"}
        }
    },

    onmempool: async function (e) {  // Save full unconfirmed transactions in separate collection
        await db.collection("u").insertMany([e.tx])
    },

    onblock: async function (e) {
        tx = JSON.parse(e.tx);
        console.log(tx)
        tx.forEach(function (question) {
            data = JSON.parse(question.out[0].s3);
            console.log(data)
            confirmed = new Question({
                id: data.i,
                username: data.u,
                date: Date.now(),
                title: data.t,
                body: data.b,
                code: '',
                tags: [],
                pinned: false,
                payOut: 0.0001,
            });

            confirmed.save();  // Save parsed transaction to questions collection
        });
        await db.collection("c").insertMany(e.tx)  // Save full transaction to separate collection
    },
    onstart: function (e) {
        return new Promise(async function (resolve, reject) {
            // if (!e.tape.self.start) {
            //
            // }
            connect(function() {
                if (e.tape.self.start) {
                    db.collection("c").deleteMany({
                        "blk.i": {"$gt": e.tape.self.end}
                    }).then(resolve)
                } else {
                    resolve();
                }
            })
        })
    }
});






