// entities/user/controller.js

var appRoot = process.cwd();
const User = require('./model');
const mockUsers = require(appRoot + '/src/mock/users.js');

// Populate the user collection with mock data
mockUsers.forEach(function(user) {
    User.findOneAndUpdate(user, user, { upsert: true }, function (error, result) {
        if (error) { console.log(error) }
    });
});

// Get user information by username
const getUser = (username) => {
    return new Promise((resolve, reject) => {
        User
            .find({ username: username })
            .exec((error, result) => {
                console.log(result);
                if (error) { console.log(error); reject(error); }
                else if (!result) reject('Username not found');
                else {
                    resolve(result);
                }
            })
    });
};

module.exports = {
    getUser,
};