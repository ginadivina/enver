const {planaria, planarium} = require('neonplanaria');
const bitquery = require('bitquery');
const MongoClient = require('mongodb')
const mongoose = require('mongoose');
const mongo_db = require('./database.js');

const tx = mongoose.model('tx', mongoose.Schema({
    tx_id: mongoose.Schema.ObjectId,
    // forum_id: { type: mongoose.Schema.ObjectId, ref: 'forum' },
    tx: String
}));

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
}

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
})

planaria.start({
    filter: {
        "from": 60000,
        "q": {
            "find": {"out.s1": "1LtyME6b5AnMopQrBPLk4FGN8UBuhxKqrn"},
            "project": { "out.s2": 1, "out.s3": 1 }
        },
        "limit": 10
    },
    onmempool: async function (e) {
        await db.collection("u").insertMany([e.tx])
    },
    onblock: async function (e) {
        await db.collection("c").insertMany(e.tx)
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






