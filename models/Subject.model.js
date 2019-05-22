const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Subjects= new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  ID_Subject: {
    type: Number
  },
  thainame: {
     type: String
  },
  engname: {
    type: String
  },
  term: {
    type: String
  }
},{
    collection: 'subjects'
});

module.exports = mongoose.model('Subjects', Subjects);