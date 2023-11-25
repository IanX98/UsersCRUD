const express = require('express');

const router = express.Router();

const path = require('path');

const userController = require('../controllers/user.controller');

router.get('/add-student/:id', userController.goToAddStudentPage);

router.post('/add-student/:id', userController.addStudent);

router.get('/students/:id', userController.getStudents);

// router.get('/users/:id', userController.getUsers);

router.get('/student/:id', userController.getSelectedUser);

router.post('/delete-user/:id', userController.deleteUser);

router.get('/edit-user/:id', userController.goToEditUserPage);

router.post('/edit-user/:id', userController.editUser);

module.exports = router
