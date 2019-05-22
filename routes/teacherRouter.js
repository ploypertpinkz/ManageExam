const express = require('express');
const app = express();
const TeacherRouter = express.Router();
const teacher = require('../models/teacher.model');

TeacherRouter.route('/').get(function (req, res) {
    teacher.find(function (err, teacher){
      if(err){
        console.log(err);
      }
      else {
        res.render('manageTeacher', {teacher: teacher});
      }
    });
});

TeacherRouter.route('/create').get(function (req, res) {
   res.render('manageTeachercreate');
 });

 TeacherRouter.route('/post').post(function (req, res) {
   const t = new teacher(req.body);
   console.log(t);
   t.save()
     .then(t1 => {
     res.redirect('/teacher'); 
     })
     .catch(err => {
     res.status(400).send("unable to save to database");
     });
 });
// -------------------------------------Edit--------------------------------------------------
TeacherRouter.route('/manageTeacheredit/:id').get(function (req, res) {
   const id = req.params.id;
   teacher.findById(id, function (err, teacher){
       res.render('manageTeacheredit', {teacher: teacher});
   });
 });

 //---------------------------------------Update-----------------------------------------------
 TeacherRouter.route('/update/:id').post(function (req, res) {
    teacher.findById(req.params.id, function(err, teacher) {
     if (!teacher)
       return next(new Error('Could not load Document'));
     else {
       // do your updates here
       teacher.name = req.body.name;
       teacher.namefull = req.body.namefull;
 
       teacher.save().then(teacher => {
           res.redirect('/teacher');
       })
       .catch(err => {
             res.status(400).send("unable to update the database");
       });
     }
   });
 });
// ---------------------------------------------delete------------------------------------------
TeacherRouter.route('/delete/:id').get(function (req, res) {
    teacher.findByIdAndRemove({_id: req.params.id},
        function(err, teacher){
         if(err) res.json(err);
         else res.redirect('/teacher');
     });
 });

 //-----------------------------------------read--------------------------------------
 TeacherRouter.route('/read/:id').get(function (req, res) {
  const id = req.params.id;
  teacher.findById(id, function (err, teacher){
      res.render('manageTeacherread', {teacher: teacher});
  });
});


module.exports = TeacherRouter;