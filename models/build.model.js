const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ManageBuilding  = new Schema({
 
  name: {
    type: String
  },
  namefull: {
     type: String
  }
},{
    collection: 'build'
});

module.exports = mongoose.model('ManageBuilding ', ManageBuilding );
