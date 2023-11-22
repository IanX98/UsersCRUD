const express = require('express');

const router = express.Router();

const path = require('path');

const classController = require('../controllers/class.controller');

router.get('/', classController.goToHomePage);

router.get('/add-class', classController.goToAddClassPage);

router.post('/add-class', classController.addClass);

router.get('/classes', classController.getClasses);

// router.get('/class/:id', classController.getSelectedClass);

// router.post('/delete-class/:id', classController.deleteClass);

// router.get('/edit-class/:id', classController.goToEditClassPage);

// router.post('/edit-class/:id', classController.editClass);

module.exports = router
