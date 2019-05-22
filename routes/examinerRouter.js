const express = require('express');
const app = express();
const examinerRouter = express.Router();
const Exams = require('../models/Exams.model');

examinerRouter.route('/').get(function (req, res) {
    Exams .find(function (err, exams){
        if(err){
          console.log(err);
        }
        else {
          res.render('manageExaminer', {exams: exams}); 
        }
      });
  });


  examinerRouter.route('/manageExaminer').get(function (req, res) {
    Exams.find(function (err, exams){
      if(err){
        console.log(err);
      }
      else {
        res.render('manageExaminer', {exams: exams}); 
      }
    });
  });

  examinerRouter.route('/manageExamStatus').get(function (req, res) {
    res.render('manageExamStatus');
  });


 examinerRouter.route('/post').post(function (req, res) {
   const ex = new Exams(req.body);
   console.log(s);
   ex.save()
     .then(ex => {
     res.redirect('/examiner'); 
     })
     .catch(err => {
     res.status(400).send("unable to save to database");
     });
 });


module.exports = examinerRouter;