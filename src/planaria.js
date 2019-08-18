const { planaria } = require('neonplanaria');
const { planarium } = require('neonplanaria');
const bitquery = require('bitquery');

const mongo_db = require('./database.js');

console.log('hello');

planaria.start({
    filter: {
        "from": 566470,
        "q": {
            "find": {"out.s1": "1LtyME6b5AnMopQrBPLk4FGN8UBuhxKqrn"},
            "project": { "out.s2": 1, "out.s3": 1 }
        },
    },
    onmempool: async function (e) {
        console.log('inserting');
        await mongo_db.collection("u").insertMany([e.tx])
    },
    onblock: async function (e) {
        console.log('inserting');
        await mongo_db.collection("c").insertMany(e.tx)
    },
    onstart: function (e) {
        console.log(e);
        console.log('onstart');
        return new Promise(async function (resolve, reject) {
            if (!e.tape.self.start) {
                console.log('hi');
            }
            connect(function () {
                if (e.tape.self.start) {
                    mongo_db.collection("c").deleteMany({
                        "blk.i": {"$gt": e.tape.self.end}
                    }).then(resolve)
                } else {
                    resolve();
                }
            })
        })
    },
})

planarium.start({
    name: "Weather SV DEMO",
    port: 5001,
    onstart: async function() {
        let db = await bitquery.init({ url: "mongodb://127.0.0.1:27017", address: "enverDB" });
        return { db: db };
    },
    onquery: function(e) {
        console.log(e);
        let code = Buffer.from(e.query, 'base64').toString()
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

