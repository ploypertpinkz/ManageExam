const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teacher = new Schema({

    name: {
        type: String
    },
    email: {
        type: String
    },
    office: {
        type: String
    },
    education: {
        type: String
    },
    username: {
        type: String
    },
    password: {
        type: String
    }

}, {
        collection: 'teacher'
    });

module.exports = mongoose.model('teacher', teacher);