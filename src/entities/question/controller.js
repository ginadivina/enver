// entities/question/controller.js

let appRoot = process.cwd();
const Question = require('./model');
const mockQuestions = require(appRoot + '/src/mock/questions.js');

// Populate the question collection with mock data
mockQuestions.forEach(function(question) {
    Question.findOneAndUpdate(question, question, { upsert: true }, function (error, result) {
        if (error) { console.log(error) }
    });
});

const getAll = () => {
    // Find all questions in DB
    return new Promise((resolve, reject) => {

        Question
            .find({ })
            .exec((error, result) => {
                console.log(result);
                if (error) { console.log(error); reject(error); }
                else if (!result) reject('Questions not found');
                else {
                    resolve(result);
                }
            })

    });

};

const getById = (id) => {

    return new Promise((resolve, reject) => {

        Question
            .find({id:id})
            .exec((error, result) => {
                console.log(result);
                if (error) { console.log(error); reject(error); }
                else if (!result) reject('Question not found');
                else {
                    resolve(result);
                }
            })

    });

};

const createQuestion = (question) => {
    // Save new question to DB
    return new Promise((resolve, reject) => {

        const newQuestion = new Question({
            id: "12j3hk12jh3",
            username: 'testuser1',
            date: Date.now(),
            title: question.title,
            body: question.body,
            code: question.code,
            tags: ['test'],
            pinned: false,
            payOut: question.payOut,
        });

        newQuestion
            .save((error) => {
                console.log(newQuestion);
                if (error) { console.log(error); reject(error); }
                else {
                    resolve({
                        "success": true,
                        "question_id": newQuestion._id
                    });
                }
            })

    });

};

module.exports = {
    getAll,
    getById,
    createQuestion,
};