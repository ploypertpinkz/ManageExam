const express = require('express');
const app = express();
const mainStudentRouter = express.Router();
const User = require('../models/User.model');

mainStudentRouter.route('/').get(function (req, res) {
  User.find(function (err, user){
      if(err){
        console.log(err);
      }
      else {
        res.render('mainStudent', {user: user});
      }
    });
});


module.exports = mainStudentRouter;