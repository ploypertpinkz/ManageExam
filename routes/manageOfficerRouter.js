const express = require('express');
const app = express();
const manageOfficerRouter = express.Router();
const Officer = require('../models/officer.model');

manageOfficerRouter.route('/').get(function (req, res) {
    Officer.find(function (err, officer){
      if(err){
        console.log(err);
      }
      else {
        res.render('manageOfficer', {officer: officer});
      }
    });
});

manageOfficerRouter.route('/manageOfficerCreate').get(function (req, res) {
   res.render('manageOfficerCreate');
 });

manageOfficerRouter.route('/post').post(function (req, res) {
   const officer = new Officer(req.body);
   console.log(officer);
   officer.save()
     .then(officer => {
     res.redirect('/officer'); 
     })
     .catch(err => {
     res.status(400).send("unable to save to database");
     });
 });

manageOfficerRouter.route('/manageOfficerSee/:id').get(function (req, res) {
  const id = req.params.id;
  Officer.findById(id, function (err, officer){
      res.render('manageOfficerSee', {officer: officer});
  });
});

// -------------------------------------Edit--------------------------------------------------
manageOfficerRouter.route('/manageOfficerEdit/:id').get(function (req, res) {
   const id = req.params.id;
   Officer.findById(id, function (err, officer){
       res.render('manageOfficerEdit', {officer: officer});
   });
 });

 //---------------------------------------Update-----------------------------------------------
 manageOfficerRouter.route('/update/:id').post(function (req, res) {
    Officer.findById(req.params.id, function(err, officer) {
     if (!officer)
       return next(new Error('Could not load Document'));
     else {
       // do your updates here
       officer.name = req.body.name;
       officer.bday = req.body.bday;
       officer.rank = req.body.rank;
       officer.email = req.body.email;
       officer.tel = req.body.tel;
       officer.status = req.body.status;
 
       officer.save().then(officer => {
           res.redirect('/officer');
       })
       .catch(err => {
             res.status(400).send("unable to update the database");
       });
     }
   });
 });
// ---------------------------------------------delete------------------------------------------
manageOfficerRouter.route('/delete/:id').get(function (req, res) {
    Officer.findByIdAndRemove({_id: req.params.id},
        function(err, officer){
         if(err) res.json(err);
         else res.redirect('/officer');
     });
 });

module.exports = manageOfficerRouter;