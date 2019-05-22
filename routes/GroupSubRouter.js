const express = require('express');
const GroupSubjectRouter = express.Router();
const GroupSubject = require('../models/GroupSubject.model');
const Subject = require('../models/Subject.model');

GroupSubjectRouter.route('/').get(function (req, res) {
  GroupSubject.find(function (err, gsub){
      if(err){
        console.log(err);
      }
      else {
        res.render('manageGroupSub', {gsub: gsub}); 
      }  
  });
});


GroupSubjectRouter.route('/post').post(function (req, res) {
  const gsub = new GroupSubject(req.body);
  console.log(gsub);
  gsub.save()
    .then(gsub => {
    res.redirect('/manageGroupSubject'); 
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

GroupSubjectRouter.route('/subCreate').get(function (req, res) {
   res.render('createGroupSubjects');
 });


// -------------------------------------Edit--------------------------------------------------
GroupSubjectRouter.route('/gsubEdit/:id').get(function (req, res) {
   const id = req.params.id;
   GroupSubject.findById(id, function (err, gsub){
       res.render('editGroupSubject', {gsub: gsub});
   });
 });

 //---------------------------------------Update-----------------------------------------------
 GroupSubjectRouter.route('/update/:id').post(function (req, res) {
    GroupSubject.findById(req.params.id, function(err, gsub) {
     if (!gsub)
       return next(new Error('Could not load Document'));
     else {
       // do your updates here
       gsub.ID_Subject = req.body.ID_Subject;
       gsub.groupSub = req.body.groupSub;
       gsub.term = req.body.term;
      //  gsub.engname = req.body.engname;
      //  gsub.thainame = req.body.thainame;
 
       gsub.save().then(gsub => {
           res.redirect('/manageGroupSubject');
       })
       .catch(err => {
             res.status(400).send("unable to update the database");
       });
     }
   });
 });

// ---------------------------------------------delete------------------------------------------
GroupSubjectRouter.route('/delete/:id').get(function (req, res) {
    GroupSubject.findByIdAndRemove({_id: req.params.id},
        function(err, gsub){
         if(err) res.json(err);
         else res.redirect('/manageGroupSubject');
     });
 });

module.exports = GroupSubjectRouter;