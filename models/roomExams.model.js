const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoomExamsSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  id_exams: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Exams'
  },
  id_build: {
    type: mongoose.Schema.Types.ObjectId, ref: 'ManageBuilding'
  },
  id_room: {
    type: mongoose.Schema.Types.ObjectId, ref: 'manageRoom'
  },
  id_group: {
    type: mongoose.Schema.Types.ObjectId, ref: 'GroupSubjects'
  },
  id_examiner: {
    type: mongoose.Schema.Types.ObjectId, ref: 'teacher'
  },
  date: {
    type: String
  },
  timeF: {
    type: String
  },
  timeL: {
    type: String
  },
  build: {
    type: String
  },
  room: {
    type: String
  },
  examiner: {
    type: String
  },
  group: {
    type: String
  }
}, {
    collection: 'roomExams'
  });

module.exports = mongoose.model('roomExams', RoomExamsSchema);