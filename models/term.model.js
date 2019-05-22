const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Manageterm  = new Schema({
 
  year: {
    type: Number
  },
  term: {
     type: String
  }
},{
    collection: 'term'
});

module.exports = mongoose.model('Manageterm ', Manageterm );
