const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    forum_id: mongoose.Schema.ObjectId,
    username: String,
    avatarURL: String,
    role: { type: String, default: 'user' },
});

module.exports = mongoose.model('user', userSchema);