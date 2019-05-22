const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GroupSubjects = new Schema({
  ID_Subject: {
    type: Number
  },
  groupSub: {
    type: Number
  },
  term: {
    type: String
  }
},{
    collection: 'groupSubjects'
});

module.exports = mongoose.model('GroupSubjects', GroupSubjects);