require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// Import routes
const Planaria = require('./src/planaria');
const userRoutes = require('./src/entities/user/api');
const forumRoutes = require('./src/entities/forum/api');
const questionRoutes = require('./src/entities/question/api');
const mongo_db = require('./src/database.js');
const app = express();
const port = 5000;

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

