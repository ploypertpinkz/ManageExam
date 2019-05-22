const express = require('express');
const app = express();
const RoomRouter = express.Router();
const room =  require('../models/room.model');


RoomRouter.route('/').get(function (req, res) {
    room.find(function (err, room){
      if(err){
        console.log(err);
      }
      else {
        res.render('manageRoom', {room: room});
      }
    });
});

RoomRouter.route('/create').get(function (req, res) {
   res.render('manageRoomcreate');
 });

 RoomRouter.route('/post').post(function (req, res) {
   const t = new room(req.body);
   console.log(t);
   t.save()
     .then(t1 => {
     res.redirect('/room'); 
     })
     .catch(err => {
     res.status(400).send("unable to save to database");
     });
 });
// -------------------------------------Edit--------------------------------------------------
RoomRouter.route('/manageRoomedit/:id').get(function (req, res) {
   const id = req.params.id;
   room.findById(id, function (err, room){
       res.render('manageRoomedit', {room: room});
   });
 });

 //---------------------------------------Update-----------------------------------------------
 RoomRouter.route('/update/:id').post(function (req, res) {
    room.findById(req.params.id, function(err, room) {
     if (!room)
       return next(new Error('Could not load Document'));
     else {
       // do your updates here
       room.build = req.body.build;
       room.roomname = req.body.roomname;
       room.floor = req.body.floor;
       room.roomtype = req.body.roomtype;
       room.numSeats = req.body.numSeats;
       room.rows = req.body.rows;
       room.columns = req.body.columns;
 
       room.save().then(room => {
           res.redirect('/room');
       })
       .catch(err => {
             res.status(400).send("unable to update the database");
       });
     }
   });
 });
// ---------------------------------------------delete------------------------------------------
RoomRouter.route('/delete/:id').get(function (req, res) {
    room.findByIdAndRemove({_id: req.params.id},
        function(err, room){
         if(err) res.json(err);
         else res.redirect('/room');
     });
 });

 //-----------------------------------------read--------------------------------------
 RoomRouter.route('/read/:id').get(function (req, res) {
  const id = req.params.id;
  room.findById(id, function (err, room){
      res.render('manageRoomread', {room: room});
  });
});


module.exports = RoomRouter;