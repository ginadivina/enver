const {planaria, planarium} = require('neonplanaria');
const bitquery = require('bitquery');
const mongoose = require('mongoose');
const mongo_db = require('./database.js');

const tx = mongoose.model('tx', mongoose.Schema({
    tx_id: mongoose.Schema.ObjectId,
    // forum_id: { type: mongoose.Schema.ObjectId, ref: 'forum' },
    tx: String
}));

planaria.start({
    filter: {
        "from": 566470,
        "q": {
            "find": {"out.s1": "1LtyME6b5AnMopQrBPLk4FGN8UBuhxKqr"},
        },
        "limit": 10,
    },
    onstart: function (e) {
        console.log('yeenaw', e);
        return new Promise(async function (resolve, reject) {
            if (e.tape.self.start) {
                mongo_db.collection("c").deleteMany({
                    "blk.i": {"$gt": e.tape.self.end}
                }).then(resolve)
            } else {
                resolve();
            }
        })
    },
    onmempool: async function (e) {
        console.log('yeehaw', e.tx);
        let test = {
            tx: "123"
        };
        await tx.insertMany(test)
    },
    onblock: async function (e) {
        console.log('yeeeeeehaw', e.tx);
        await mongo_db.collection("c").insertMany(e.tx)
    }
});


planarium.start({
    name: "EnverDB",
    port: 5001,
    onstart: async function() {
        let db = await bitquery.init({ url: "mongodb://127.0.0.1:27017", address: "enverDB" });
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

