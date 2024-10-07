const express = require('express');
const { submitQuiz, getStudentResults, getQuizResults } = require('../controllers/resultController');
const auth = require('../middleware/auth');
const router = express.Router();

// Submit quiz results (student)
router.post('/submit', auth, submitQuiz);

// Get student's own results
router.get('/student', auth, getStudentResults);

// Get all results for a specific quiz (teacher)
router.get('/quiz/:quizId', auth, getQuizResults);

module.exports = router;