const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const swal = require('sweetalert');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://admin:ooad1234@ds217976.mlab.com:17976/manageexam');

// const CoinRouter = require('./routes/CoinRouter');
const LoginRouter = require('./routes/LoginRouter');
const MainRouter = require('./routes/MainRouter');
const ManageExamsRouter = require('./routes/ManageExamsRouter');
const AddExamsRouter = require('./routes/AddExamsRouter');
const readInfoExamsRouter = require('./routes/ReadInfoExamsRouter');
const TeacherRouter = require('./routes/teacherRouter');
const manageOfficerRouter = require('./routes/manageOfficerRouter');
const StudentRouter = require('./routes/StudentRouter');
const Manage_build = require('./routes/buildRouter');
const Manage_term = require('./routes/termRouter');
const RoomRouer = require('./routes/roomRouter');
const mainTeacherRouter = require('./routes/mainTeacherRouter');
const mainStudentRouter = require('./routes/mainStudentRouter');
const manage_examiner = require('./routes/examinerRouter');

const subjectRouter = require('./routes/SubjectRouter');
const groupSubjectRouter = require('./routes/GroupSubRouter');
const teacherGroupRouter = require('./routes/TeacherGroupRouter');
const studentGroupRouter = require('./routes/StudentGroupRouter');



app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/login', LoginRouter);
app.use('/main', MainRouter);
app.use('/manageExams', ManageExamsRouter);
app.use('/addExams', AddExamsRouter);
app.use('/readExams', readInfoExamsRouter);
app.use('/teacher',TeacherRouter);
app.use('/officer', manageOfficerRouter);
app.use('/student', StudentRouter);
app.use('/build', Manage_build);
app.use('/term', Manage_term);
app.use('/room', RoomRouer);
app.use('/mainTeacher',mainTeacherRouter);
app.use('/mainStudent',mainStudentRouter);
app.use('/examiner', manage_examiner);

app.use('/manageSubject', subjectRouter);
app.use('/manageGroupSubject', groupSubjectRouter);
app.use('/teacherGroup', teacherGroupRouter);
app.use('/studentGroup', studentGroupRouter);


app.get('/', function (req, res) {
   res.sendFile(path.join(__dirname,'public', 'index.html'));
});

app.listen(port, function(){
  console.log('Node js Express js Tutorial at port', port);
});
