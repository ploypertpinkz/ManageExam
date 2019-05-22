const express = require('express');
const app = express();
const Manage_build = express.Router();
const ManageBuilding = require('../models/build.model');

Manage_build.route('/').get(function (req, res) {
  ManageBuilding .find(function (err, build){
      if(err){
        console.log(err);
      }
      else {
        res.render('ManageBuild', {build: build}); 
      }
    });
});

Manage_build.route('/ManageBuild').get(function (req, res) {
  ManageBuilding .find(function (err, build){
    if(err){
      console.log(err);
    }
    else {
      res.render('ManageBuild', {build: build}); 
    }
  });
});


Manage_build.route('/ManageBuildcreate').get(function (req, res) {
   res.render('ManageBuildcreate');
 });

 Manage_build.route('/post').post(function (req, res) {
   const manage = new ManageBuilding(req.body);
   console.log(manage);
   manage.save()
     .then(manage => {
     res.redirect('/build'); 
     })
     .catch(err => {
     res.status(400).send("unable to save to database");
     });
 });
// -------------------------------------Edit--------------------------------------------------
Manage_build.route('/ManageBuildedit/:id').get(function (req, res) {
   const id = req.params.id;
   ManageBuilding.findById(id, function (err, manage){
       res.render('ManageBuildedit', {manage: manage});
   });
 });
// ---------------------------------------------Read------------------------------------------
Manage_build.route('/ManageBuildread/:id').get(function (req, res) {
  const id = req.params.id;
  ManageBuilding.findById(id, function (err, manage){
      res.render('ManageBuildread', {manage: manage});
  });
});
 //---------------------------------------Update-----------------------------------------------
 Manage_build.route('/update/:id').post(function (req, res) {
  ManageBuilding.findById(req.params.id, function(err, manage) {
     if (!manage)
       return next(new Error('Could not load Document'));
     else {
       // do your updates here
       manage.name = req.body.name;
       manage.namefull = req.body.namefull;
 
       manage.save().then(manage => {
           res.redirect('/build');
       })
       .catch(err => {
             res.status(400).send("unable to update the database");
       });
     }
   });
 });
// ---------------------------------------------delete------------------------------------------
 Manage_build.route('/delete/:id').get(function (req, res) {
  ManageBuilding.findByIdAndRemove({_id: req.params.id},
        function(err, manage){
         if(err) res.json(err);
         else res.redirect('/build');
     });
 });

module.exports = Manage_build;