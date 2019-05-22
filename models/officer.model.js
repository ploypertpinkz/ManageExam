const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const officer = new Schema({
  name: {
    type: String
  },
  rank: {
    type: String
  },
  email: {
    type: String
  },
  tel: {
    type: String
  }, 
  status: {
    type: String
  },
  username: {
    type: String
  }, 
  password: {
    type: String
  }
},{
    collection: 'officer'
});
module.exports = mongoose.model('officer', officer);