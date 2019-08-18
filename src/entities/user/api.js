const getUser = require('./controller').getUser;

const userRoutes = (app) => {

    app.get('/api/user/:username', (req, res) => {
        getUser(req.params.username).then(
            result => { res.send(result); },
            error => { res.send({ error }); }
        );
    });

    app.get('/api/user/profile', (req, res) => {
        res.send(
            `profile: profile`,
        );
    });
};

module.exports = userRoutes;