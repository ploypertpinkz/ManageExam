const express = require('express');
const mongoose = require('mongoose');
const TeacherGroupRouter = express.Router();
const TeacherGroup = require('../models/TeacherGroup.model');
const Teacher = require('../models/teacher.model');

TeacherGroupRouter.route('/').get(function (req, res) {
    TeacherGroup.find(function (err, tGroup){
      if(err){
        console.log(err);
      }
      else {
        res.render('manageTeacherGroup', {tGroup: tGroup}); 
      }  
  });
});

TeacherGroupRouter.route('/post').post(function (req, res) {
    Teacher.findById(req.body.name, function (err, teacher) {
        if (!teacher) {
            return next(new Error('Could not load Document'));
        } else {
            var name = teacher.name;
            const teacherGroup = new TeacherGroup({
                _id: new mongoose.Types.ObjectId(),
                ID_Subject: req.body.ID_Subject,
                groupSub: req.body.groupSub,
                term: req.body.term,
                nameT1: name
            });
            teacherGroup.save()
                .then(teacherGroup => {
                    res.redirect('/teacherGroup');
                })
                .catch(err => {
                    res.status(400).send("unable to save to database");
                });
        }
    });
 });
 


TeacherGroupRouter.route('/tgroupCreate').get(function (req, res) {
    Teacher.find(function (err, teacher){
        if(err){
          console.log(err);
        }
        else {
          res.render('createTeacherGroup', {teacher: teacher}); 
        }  
    });
 });

// ---------------------------------------------delete------------------------------------------
TeacherGroupRouter.route('/delete/:id').get(function (req, res) {
    TeacherGroup.findByIdAndRemove({_id: req.params.id},
        function(err, tgroup){
         if(err) res.json(err);
         else res.redirect('/teacherGroup');
     });
 });

module.exports = TeacherGroupRouter;