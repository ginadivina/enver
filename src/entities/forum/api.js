const forumRoutes = (app) => {

    app.get('/api/forum/getAll', (req, res) => {
        res.send(
            `getAll: getAll`,
        );
    });

    app.get('/api/forum/:forum_id/posts', (req, res) => {
        res.send(
            `posts: posts`,
        );
    });
};

module.exports = forumRoutes;