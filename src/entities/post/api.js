const postRoutes = (app) => {

    app.post('/api/post/newPost', (req, res) => {
        res.send(
            `newPost: newPost given forum_id`,
        );
    });

    app.get('/api/post/:post', (req, res) => {
        res.send(
            `post: post`,
        );
    });
};

module.exports = postRoutes;