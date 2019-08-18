const userRoutes = (app) => {

    app.get('/api/user/getUser', (req, res) => {
        res.send(
            `getUser: getUser`,
        );
    });

    app.get('/api/user/profile', (req, res) => {
        res.send(
            `profile: profile`,
        );
    });
};

module.exports = userRoutes;