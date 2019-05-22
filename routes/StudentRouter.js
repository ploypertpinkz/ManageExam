const express = require('express');
const app = express();
const StudentRouter = express.Router();
const student = require('../models/Student.model');

StudentRouter.route('/').get(function (req, res) {
   student.find(function (err, student){
      if(err){
        console.log(err);
      }
      else {
        res.render('ManageStudentindex', {student: student});
      }
    });
});

StudentRouter.route('/create').get(function (req, res) {
   res.render('ManageStudentcreate');
 });

 StudentRouter.route('/post').post(function (req, res) {
   const s = new student(req.body);
   console.log(s);
   s.save()
     .then(stu => {
     res.redirect('/student'); 
     })
     .catch(err => {
     res.status(400).send("unable to save to database");
     });
 });
// -------------------------------------Edit--------------------------------------------------
StudentRouter.route('/edit/:id').get(function (req, res) {
   const id = req.params.id;
   student.findById(id, function (err, student){
       res.render('ManageStudentedit', {student: student});
   });
 });

 // ---------------------------------------------Read------------------------------------------
 StudentRouter.route('/read/:id').get(function (req, res) {
  const id = req.params.id;
  student.findById(id, function (err, student){
      res.render('ManageStudentread', {student: student});
  });
});

 
 // ---------------------------------------------------------------------------------------
 //---------------------------------------Update-----------------------------------------------
 StudentRouter.route('/update/:id').post(function (req, res) {
  student.findById(req.params.id, function(err, student) {
     if (!student)
       return next(new Error('Could not load Document'));
     else {
       // do your updates here
       student.code = req.body.code;
       student.name = req.body.name;
       student.faculty = req.body.faculty;
       student.branch = req.body.branch;
       student.teaName = req.body.teaName;
       student.email = req.body.email;
 
       student.save().then(student => {
           res.redirect('/student');
       })
       .catch(err => {
             res.status(400).send("unable to update the database");
       });
     }
   });
 });
// ---------------------------------------------delete------------------------------------------
StudentRouter.route('/delete/:id').get(function (req, res) {
   student.findByIdAndRemove({_id: req.params.id},
        function(err, student){
         if(err) res.json(err);
         else res.redirect('/student');
     });
 });

module.exports = StudentRouter;