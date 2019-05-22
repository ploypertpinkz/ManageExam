const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const room = new Schema({

    build: {
        type: String
    },
    roomname: {
        type: String
    },
    floor: {
        type: Number
    },
    roomtype: {
        type: String
    },
    numSeats: {
        type: Number
    },
    rows: {
        type: Number
    },
    columns: {
        type: Number
    }

}, {
        collection: 'manageRoom'
    });

module.exports = mongoose.model('manageRoom', room);