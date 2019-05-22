const express = require('express');
const app = express();
const ManageExamsRouter = express.Router();
const Exams = require('../models/Exams.model');

ManageExamsRouter.route('/').get(function (req, res) {
    Exams.find(function (err, exams){
        if(err){
          console.log(err);
        }
        else {
            res.render('manageExams', { exams: exams});
        }
      });
});


module.exports = ManageExamsRouter;