const questionRoutes = (app) => {

    app.post('/api/post/newQuestion', (req, res) => {
        res.send(
            `newQuestion: newQuestion given forum_id`,
        );
    });

    app.get('/api/question/:question', (req, res) => {
        res.send(
            `question: question`,
        );
    });
};

module.exports = questionRoutes;