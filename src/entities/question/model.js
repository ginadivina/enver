const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
    question_id: mongoose.Schema.ObjectId,
    // forum_id: { type: mongoose.Schema.ObjectId, ref: 'forum' },
    username: { type: String, ref: 'user' },
    date: Date,
    title: String,
    body: Object,
    code: Object,
    tags: Array,
    pinned: Boolean,
    payOut: Number,
});

module.exports = mongoose.model('question', questionSchema);