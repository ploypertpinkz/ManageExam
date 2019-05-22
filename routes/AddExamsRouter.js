const express = require('express');
const mongoose = require('mongoose');
const AddExamsRouter = express.Router();
const Exams = require('../models/Exams.model');
const RoomExams = require('../models/roomExams.model');
const Subjects = require('../models/Subject.model');
const Build = require('../models/build.model');
const Room = require('../models/room.model');
const GroupSubject = require('../models/GroupSubject.model');
const Teacher = require('../models/teacher.model');

// ------------------------------------- Add Exams --------------------------------------------------
AddExamsRouter.route('/').get(function (req, res) {
    Subjects.find(function (err, subjects) {
        if (err) {
            console.log(err);
        }
        else {
            res.render('addExams', {
                subjects: subjects
            });
        }
    });
});

// -------------------- Save Exams --------------------
AddExamsRouter.route('/post').post(function (req, res) {
    console.log(req.body.subject);
    Subjects.findById(req.body.subject, function (err, subjects) {
        if (!subjects) {
            return next(new Error('Could not load Document'));
        } else {
            var idsub = subjects.ID_Subject;
            var name = subjects.engname;
            const exams = new Exams({
                _id: new mongoose.Types.ObjectId(),
                subjects: req.body.subject,
                numSubject: idsub,
                nameSubject: name,
                date: req.body.date,
                timeF: req.body.timeF,
                timeL: req.body.timeL
            });
            exams.save()
                .then(exams => {
                    res.redirect('/manageExams');
                })
                .catch(err => {
                    res.status(400).send("unable to save to database");
                });
        }
    });
});

// ------------------------------------- show Add Room --------------------------------------------------
AddExamsRouter.route('/addRoomExams/:id').get(function (req, res) {
    const id = req.params.id;
    RoomExams.find(function (err, roomExams) {
           Build.find(function (err, build) {
            Room.find(function (err, room) {
                GroupSubject.find(function (err, group) {
                    Teacher.find(function (err, teacher) {
                        Exams.findById(id, function (err, exams) {
                            res.render('addRoomExams', {
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

// -------------------- save add room --------------------
AddExamsRouter.route('/addroom/:id').post(function (req, res) {
    const id = req.params.id;
    const id_build = req.body.build;
    const id_room = req.body.room;
    const id_group = req.body.group;
    const id_examiner = req.body.teacher;
    Build.findById(id_build, function (err, build) {
        console.log("111");
        Room.findById(id_room, function (err, room) {
            console.log("2");
            GroupSubject.findById(id_group, function (err, group) {
                console.log("3");
                Teacher.findById(id_examiner, function (err, teacher) {
                    console.log("111");
                    Exams.findById(id, function (err, exams) {
                        if (!exams) {
                            return next(new Error('Could not load Document'));
                        } else {

                            const roomExams = new RoomExams({
                                _id: new mongoose.Types.ObjectId(),
                                id_exams: id,
                                id_build: id_build,
                                id_room: id_room,
                                id_group: id_group,
                                id_examiner: id_examiner,
                                date: req.body.date,
                                timeF: req.body.timeF,
                                timeL: req.body.timeL,
                                build: build.name,
                                room: room.roomname,
                                group: group.groupSub,
                                examiner: teacher.name
                            });
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




module.exports = AddExamsRouter;