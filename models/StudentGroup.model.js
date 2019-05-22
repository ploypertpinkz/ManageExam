const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentGroup = new Schema({
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
  nameS1:{
      type: String
  }
},{
    collection: 'studentGroup'
});

module.exports = mongoose.model('StudentGroup', StudentGroup);