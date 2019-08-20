// entities/forum/api.js

const forumRoutes = (app) => {

    // Get all forums saved in DB
    // WIP!! We want to group by tags instead of forums...
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