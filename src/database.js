const mongoose = require('mongoose');
const url = process.env.DATABASE_URL;

class Database {
    constructor() {
        this._connect()
    }

    _connect() {
        mongoose.connect(url, {useNewUrlParser: true})
            .then(() => {
                console.log('Database connection successful')
            })
            .catch(err => {
                console.error('Database connection error: ', err)
            })
    }
}

module.exports = new Database();