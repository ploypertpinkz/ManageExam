const express = require('express');
const app = express();
const MainRouter = express.Router();
const User = require('../models/User.model');
const Manageterm = require('../models/term.model');

MainRouter.route('/').get(function (req, res) {
  User.find(function (err, user){
    Manageterm.find(function (err, manageterm) {
      if(err){
        console.log(err);
      }
      else {
        res.render('main', {user: user, manageterm: manageterm});
      }
    });
  });
});



module.exports = MainRouter;