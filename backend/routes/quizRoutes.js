const express = require('express');
const { createQuiz, getQuizzes, getQuizById } = require('../controllers/quizController');
const auth = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', auth, createQuiz); // Teacher only
router.get('/', auth, getQuizzes);
router.get('/:id', auth, getQuizById);

module.exports = router;