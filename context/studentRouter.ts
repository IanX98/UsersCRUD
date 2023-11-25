const express = require('express');

const router = express.Router();

const path = require('path');

const studentController = require('../controllers/student.controller');

router.get('/add-student/:id', studentController.goToAddStudentPage);

router.post('/add-student/:id', studentController.addStudent);

router.get('/students/:id', studentController.getStudents);

router.get('/student/:classId/:id', studentController.getSelectedStudent);

router.post('/delete-student/:classId/:id', studentController.deleteStudent);

router.get('/edit-user/:id', studentController.goToEditUserPage);

router.post('/edit-user/:id', studentController.editUser);

module.exports = router
