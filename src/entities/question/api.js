// entitites/question/api.js

const getAll = require('./controller').getAll;
const getById = require('./controller').getById;
const createQuestion = require('./controller').createQuestion;

const questionRoutes = (app) => {

    // Save new question to DB
    app.post('/api/question/newQuestion', (req, res) => {
        createQuestion(req.body).then(
            result => { res.send(result); },
            error => { res.send({ error }); }
        )
    });

    // Return list of all questions in DB
    app.get('/api/question/getAll', (req, res) => {
        getAll().then(
            result => { res.send(result); },
            error => { res.send({ error }); }
        );
    });

    app.get('/api/question/:id', (req, res) => {
        getById(req.params.id).then(
            result => { res.send(result); },
                error => { res.send({ error }); }
        )
    });
};

module.exports = questionRoutes;