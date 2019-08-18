var appRoot = process.cwd();
const Question = require('./model');
const mockQuestions = require(appRoot + '/src/mock/questions.js');

Question.deleteMany({}, function(error, result) {

    if (error) { console.log(error) }

    Question.insertMany(mockQuestions, function (error, result) {
        if (error) { console.log(error) }
    });

});

const getAll = () => {

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

const createQuestion = (question) => {

    return new Promise((resolve, reject) => {

        const newQuestion = new Question({
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
    createQuestion,
};