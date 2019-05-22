const express = require('express');
const mongoose = require('mongoose');
const ReadInfoExamsRouter = express.Router();
const Exams = require('../models/Exams.model');
const RoomExams = require('../models/roomExams.model');
const Subjects = require('../models/Subject.model');
const Build = require('../models/build.model');
const Room = require('../models/room.model');
const GroupSubject = require('../models/GroupSubject.model');
const Teacher = require('../models/teacher.model');

// ------------------------------------- Read Info --------------------------------------------------
ReadInfoExamsRouter.route('/:id').get(function (req, res) {
    const id = req.params.id;
    Exams.findById(id, function (err, exams) {
        RoomExams.find(function (err, roomExams) {
            res.render('readInfoExams', {
                exams: exams,
                roomExams: roomExams
            });
        });
    });
});

// ------------------------------------- Edit Info --------------------------------------------------
ReadInfoExamsRouter.route('/editInfoExams/:id').get(function (req, res) {
    const id = req.params.id;
    // RoomExams.find(function (err, roomExams) {
    //     Exams.findById(id, function (err, exams) {
    //         res.render('editInfoExams', { exams: exams,roomExams:roomExams });
    //     });
    // });
     RoomExams.find(function (err, roomExams) {
           Build.find(function (err, build) {
            Room.find(function (err, room) {
                GroupSubject.find(function (err, group) {
                    Teacher.find(function (err, teacher) {
                        Exams.findById(id, function (err, exams) {
                            res.render('editInfoExams', {
                                exams: exams,
                                build: build,
                                room: room,
                                group: group,
                                teacher: teacher,
                                roomExams: roomExams
                            });
                        });
                    });
                });
            });
        }); 
    });

});
    

ReadInfoExamsRouter.route('/edit/:id').post(function (req, res) {
    const id = req.params.id;
    const id_build = req.body.build;
    const id_room = req.body.room;
    const id_group = req.body.group;
    const id_examiner = req.body.teacher;
    RoomExams.findById(id, function (err, roomExams) {
        const id_exams = roomExams.id_exams;
        Build.findById(id_build, function (err, build) {
            console.log("111");
            Room.findById(id_room, function (err, room) {
                console.log("2");
                GroupSubject.findById(id_group, function (err, group) {
                    console.log("3");
                    Teacher.findById(id_examiner, function (err, teacher) {
                        console.log("4");
                        Exams.findById(id_exams, function (err, exams) {
                            console.log("5");
                            if (!roomExams) {
                                return next(new Error('Could not load Document'));
                            } else {
                                console.log("6");
                                roomExams.id_exams = id;
                                roomExams.id_build = id_build;
                                roomExamsroomExams.id_room = id_room;
                                roomExams.id_group = id_group;
                                roomExams.id_examiner = id_examiner;
                                roomExams.date = req.body.date;
                                roomExams.timeF = req.body.timeF;
                                roomExams.timeL = req.body.timeL;
                                roomExams.build = build.name;
                                roomExams.room = room.roomname;
                                roomExams.group = group.groupSub;
                                roomExams.examiner = teacher.name;

                                console.log("111");
                                roomExams.save()
                                    .then(roomExams => {
                                        res.redirect('/manageExams');
                                    })
                                    .catch(err => {
                                        res.status(400).send("unable to save to database");
                                    });
                            }
                        });
                    });
                });
            });
        });
    });
});

ReadInfoExamsRouter.route('/delete/:id').get(function (req, res) {
    RoomExams.findByIdAndRemove({_id: req.params.id},
         function(err, roomExams){
          if(err) res.json(err);
          else res.redirect('/manageExams');
      });
  });

module.exports = ReadInfoExamsRouter;