require('dotenv').config();

const { planaria } = require('neonplanaria');
const bitquery = require('bitquery')
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// Import routes
const userRoutes = require('./src/entities/user/api');
const forumRoutes = require('./src/entities/forum/api');
const questionRoutes = require('./src/entities/question/api');

const app = express();
const port = process.env.PORT || 5000;

const db = require('./src/database.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes

userRoutes(app);
forumRoutes(app);
questionRoutes(app);

app.get('/api/hello', (req, res) => {
    res.send({ express: 'Hello From Express' });
});

app.post('/api/world', (req, res) => {
    console.log(req.body);
    res.send(
        `I received your POST request. This is what you sent me: ${req.body.post}`,
    );
});

if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client/build')));

    // Handle React routing, return all requests to React app
    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}

app.listen(port, () => console.log(`Listening on port ${port}`));

planaria.start({
    filter: {
        "from": 566470,
        "q": {
            "find": { "out.s1": "1LtyME6b5AnMopQrBPLk4FGN8UBuhxKqrn" },
            "project": { "out.s2": 1, "out.s3": 1 }
        }
    },
    onmempool: async function(e) {
        await db.collection("u").insertMany([e.tx])
    },
    onblock: async function(e) {
        await db.collection("c").insertMany(e.tx)
    },
    onstart: function(e) {
        return new Promise(async function(resolve, reject) {
            if (!e.tape.self.start) {
                await planaria.exec("docker", ["pull", "mongo:4.0.4"]);
                await planaria.exec("docker", ["run", "-d", "-p", "27017-27019:27017-27019", "-v", process.cwd() + "/db:/data/db", "mongo:4.0.4"])
            }
            connect(function() {
                if (e.tape.self.start) {
                    db.collection("c").deleteMany({
                        "blk.i": { "$gt": e.tape.self.end }
                    }).then(resolve)
                } else {
                    resolve();
                }
            })
        })
    },
});