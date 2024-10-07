const Result = require('../models/Result');
const Quiz = require('../models/Quiz');

// Submit quiz (Student submits answers)
exports.submitQuiz = async (req, res) => {
    const { quizId, answers } = req.body;

    try {
        const quiz = await Quiz.findById(quizId);
        if (!quiz) return res.status(404).json({ msg: "Quiz not found" });

        let score = 0;
        const totalQuestions = quiz.questions.length;

        // Calculate the score by checking answers
        quiz.questions.forEach((question, index) => {
            if (question.correctAnswer === answers[index]) {
                score++;
            }
        });

        const result = new Result({
            studentId: req.user.id,
            quizId,
            score,
            totalQuestions,
        });

        await result.save();
        res.status(200).json({ msg: 'Quiz submitted successfully', score, totalQuestions });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: err.message });
    }
};

// Get quiz results for a student
exports.getStudentResults = async (req, res) => {
    try {
        const results = await Result.find({ studentId: req.user.id }).populate('quizId', 'title');
        res.status(200).json(results);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: err.message });
    }
};

// Get all results for a specific quiz (Teacher view)
exports.getQuizResults = async (req, res) => {
    try {
        const results = await Result.find({ quizId: req.params.quizId }).populate('studentId', 'name');
        res.status(200).json(results);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: err.message });
    }
};