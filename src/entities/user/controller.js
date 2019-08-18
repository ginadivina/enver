var appRoot = process.cwd();
const User = require('./model');
const mockUsers = require(appRoot + '/src/mock/users.js');

User.deleteMany({}, function(error, result) {
    if (error) { console.log(error) }
    User.insertMany(mockUsers, function (error, result) {
        if (error) { console.log(error) }
    });
});


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