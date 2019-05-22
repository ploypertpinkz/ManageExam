const express = require('express');
const app = express();
const Manage_term = express.Router();
const ManageTerm= require('../models/term.model');

Manage_term.route('/').get(function (req, res) {
  ManageTerm .find(function (err, term){
      if(err){
        console.log(err);
      }
      else {
        res.render('ManageTerm', {term: term}); 
      }
    });
});

Manage_term.route('/ManageTermcreate').get(function (req, res) {
   res.render('ManageTermcreate');
 });

 Manage_term.route('/post').post(function (req, res) {
   const manageT = new ManageTerm(req.body);
   console.log(manageT);
   manageT.save()
     .then(manageT => {
     res.redirect('/term'); 
     })
     .catch(err => {
     res.status(400).send("unable to save to database");
     });
 });
// -------------------------------------Edit--------------------------------------------------
Manage_term.route('/ManageTermcreate/:id').get(function (req, res) {
   const id = req.params.id;
   ManageTerm.findById(id, function (err, manageT){
       res.render('ManageTermcreate', {manageT: manageT});
   });
 });
// ---------------------------------------------Read------------------------------------------
Manage_term.route('/ManageTermread/:id').get(function (req, res) {
  const id = req.params.id;
  ManageTerm.findById(id, function (err, manageT){
      res.render('ManageTermread', {manageT: manageT});
  });
});
 //---------------------------------------Update-----------------------------------------------
 Manage_term.route('/update/:id').post(function (req, res) {
  ManageTerm.findById(req.params.id, function(err, manageT) {
     if (!manageT)
       return next(new Error('Could not load Document'));
     else {
       // do your updates here
       
       
       manageT.year = req.body.year ;
       manageT.term = req.body.term;
 
       manageT.save().then(manageT => {
           res.redirect('/term');
       })
       .catch(err => {
             res.status(400).send("unable to update the database");
       });
     }
   });
 });
// ---------------------------------------------delete------------------------------------------
Manage_term.route('/delete/:id').get(function (req, res) {
  ManageTerm.findByIdAndRemove({_id: req.params.id},
        function(err, manageT){
         if(err) res.json(err);
         else res.redirect('/term');
     });
 });

module.exports = Manage_term;