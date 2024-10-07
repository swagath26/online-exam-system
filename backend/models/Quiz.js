const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  questions: [{ question: String, options: [String], answer: String }],
});

module.exports = mongoose.model('Quiz', quizSchema);
