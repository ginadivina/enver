const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: String,
    avatarURL: String,
    role: { type: String, default: 'user' },
});

module.exports = mongoose.model('user', userSchema);