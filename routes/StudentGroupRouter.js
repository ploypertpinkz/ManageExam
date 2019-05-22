const express = require('express');
const mongoose = require('mongoose');
const StudentGroupRouter = express.Router();
const StudentGroup = require('../models/StudentGroup.model');
const Student = require('../models/Student.model');

StudentGroupRouter.route('/').get(function (req, res) {
    StudentGroup.find(function (err, sgroup){
      if(err){
        console.log(err);
      }
      else {
        res.render('manageStudentGroup', {sgroup: sgroup}); 
      }  
  });
});


StudentGroupRouter.route('/post').post(function (req, res) {
    Student.findById(req.body.name, function (err, student) {
        if (!student) {
            return next(new Error('Could not load Document'));
        } else {
            var name = student.name;
            const studentGroup = new StudentGroup({
                _id: new mongoose.Types.ObjectId(),
                ID_Subject: req.body.ID_Subject,
                groupSub: req.body.groupSub,
                term: req.body.term,
                nameS1: name
            });
            studentGroup.save()
                .then(studentGroup => {
                    res.redirect('/studentGroup');
                })
                .catch(err => {
                    res.status(400).send("unable to save to database");
                });
        }
    });
 });
 


 StudentGroupRouter.route('/sgroupCreate').get(function (req, res) {
    Student.find(function (err, student){
        if(err){
          console.log(err);
        }
        else {
          res.render('createStudentGroup', {student: student}); 
        }  
    });
 });


// ---------------------------------------------delete------------------------------------------
StudentGroupRouter.route('/delete/:id').get(function (req, res) {
    StudentGroup.findByIdAndRemove({_id: req.params.id},
        function(err, sgroup){
         if(err) res.json(err);
         else res.redirect('/studentGroup');
     });
 });

module.exports = StudentGroupRouter;