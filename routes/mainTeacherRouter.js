const express = require('express');
const app = express();
const mainTeacherRouter = express.Router();
const User = require('../models/User.model');

mainTeacherRouter.route('/').get(function (req, res) {
  User.find(function (err, user){
      if(err){
        console.log(err);
      }
      else {
        res.render('mainTeacher', {user: user});
      }
    });
});


module.exports = mainTeacherRouter;