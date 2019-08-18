const getAll = require('./controller').getAll;
const createQuestion = require('./controller').createQuestion;

const questionRoutes = (app) => {

    app.post('/api/question/newQuestion', (req, res) => {
        createQuestion(req.body).then(
            result => { res.send(result); },
            error => { res.send({ error }); }
        )
    });

    app.get('/api/question/getAll', (req, res) => {
        getAll().then(
            result => { res.send(result); },
            error => { res.send({ error }); }
        );
    });

    app.get('/api/question/:question', (req, res) => {
        res.send(
            `question: question`,
        );
    });
};

module.exports = questionRoutes;