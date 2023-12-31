const express = require('express');

const router = express.Router();

const path = require('path');

const commentController = require('../controllers/comment.controller');

router.get('/create-comment/:classId/:id', commentController.goToCreateComment);

router.post('/create-comment/:classId/:id', commentController.addComment);

router.get('/student-comments/:id', commentController.getStudentComments);

router.get('/edit-comment/:id/:commentId', commentController.goToEditCommentPage);

router.post('/edit-comment/:id/:commentId', commentController.editComment);

router.post('/delete-comment/:id/:commentId', commentController.deleteComment);

module.exports = router
