const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TeacherGroup = new Schema({
_id: mongoose.Schema.Types.ObjectId,
  ID_Subject: {
    type: Number
  },
  groupSub: {
    type: Number
  },
  term: {
    type: String
  },
  nameT1:{
    type: String
  }
},{
    collection: 'teacherGroup'
});

module.exports = mongoose.model('TeacherGroup', TeacherGroup);