const express = require('express');
const SubjectRouter = express.Router();
const Subject = require('../models/Subject.model');

SubjectRouter.route('/').get(function (req, res) {
    Subject .find(function (err, sub){
      if(err){
        console.log(err);
      }
      else {
        res.render('manageSubjects', {sub: sub});
      }
    });
});

SubjectRouter.route('/manageGroupSub').get(function (req, res) {
  Subject .find(function (err){
    if(err){
      console.log(err);
    }
    else {
      res.render('manageGroupSub');
    }
  });
});

SubjectRouter.route('/post').post(function (req, res) {
  const sub = new Subject(req.body);
  console.log(sub);
  sub.save()
    .then(sub => {
    res.redirect('/manageSubject'); 
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

SubjectRouter.route('/subCreate').get(function (req, res) {
   res.render('createSubjects');
 });


// -------------------------------------Edit--------------------------------------------------
SubjectRouter.route('/subEdit/:id').get(function (req, res) {
   const id = req.params.id;
   Subject.findById(id, function (err, sub){
       res.render('editSubjects', {sub: sub});
   });
 });

 //---------------------------------------Update-----------------------------------------------
 SubjectRouter.route('/update/:id').post(function (req, res) {
    Subject.findById(req.params.id, function(err, sub) {
     if (!sub)
       return next(new Error('Could not load Document'));
     else {
       // do your updates here
       sub.ID_Subject = req.body.ID_Subject;
       sub.engname = req.body.engname;
       sub.thainame = req.body.thainame;
 
       sub.save().then(sub => {
           res.redirect('/manageSubject');
       })
       .catch(err => {
             res.status(400).send("unable to update the database");
       });
     }
   });
 });

// ---------------------------------------------delete------------------------------------------
SubjectRouter.route('/delete/:id').get(function (req, res) {
    Subject.findByIdAndRemove({_id: req.params.id},
        function(err, sub){
         if(err) res.json(err);
         else res.redirect('/manageSubject');
     });
 });

module.exports = SubjectRouter;