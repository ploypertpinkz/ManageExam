const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExamsSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  id_exams: {
    type: Number
  },
  subjects: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Subject'
  },
  numSubject: {
    type: Number
  },
  nameSubject: {
    type: String
  },
  date: {
    type: String
  },
  timeF: {
    type: String
  },
  timeL: {
    type: String
  }
}, {
    collection: 'exams'
  });

module.exports = mongoose.model('Exams', ExamsSchema);