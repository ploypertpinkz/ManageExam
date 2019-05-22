const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Student = new Schema({
 
  code: {
    type: String
  },
  name: {
     type: String
  },
  faculty: {
    type: String
  },
  branch: {
     type: String
  },
  teaName: {
    type: String
  },
  email: {
     type: String
  },
  username: {
    type: String
  }, 
  password: {
    type: String
  }
},{
    collection: 'student'
});

module.exports = mongoose.model('Student', Student);