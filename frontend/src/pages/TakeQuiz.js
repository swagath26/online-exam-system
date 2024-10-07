import React, { useState, useEffect } from 'react';
import { Box, Typography, RadioGroup, Radio, FormControlLabel, Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import api from '../services/api';

const TakeQuiz = () => {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await api.get(`/quizzes/${quizId}`);
        setQuiz(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchQuiz();
  }, [quizId]);

  const handleChange = (questionId, answer) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const handleSubmit = async () => {
    const correctAnswers = quiz.questions.reduce((acc, q) => {
      return acc + (answers[q._id] === q.correctAnswer ? 1 : 0);
    }, 0);
    setScore(correctAnswers);
    setSubmitted(true);

    try {
      await api.post('/results', {
        quizId,
        score: correctAnswers,
        total: quiz.questions.length,
      });
    } catch (err) {
      console.error(err);
    }
  };

  if (!quiz) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4">{quiz.title}</Typography>
      {quiz.questions.map((question, index) => (
        <Box key={question._id} sx={{ my: 2 }}>
          <Typography variant="h6">{`${index + 1}. ${question.questionText}`}</Typography>
          <RadioGroup
            value={answers[question._id] || ''}
            onChange={(e) => handleChange(question._id, e.target.value)}
          >
            {question.options.map((option, idx) => (
              <FormControlLabel
                key={idx}
                value={option}
                control={<Radio />}
                label={option}
              />
            ))}
          </RadioGroup>
        </Box>
      ))}
      <Button variant="contained" onClick={handleSubmit}>
        Submit Quiz
      </Button>
      {submitted && (
        <Typography variant="h5" sx={{ mt: 2 }}>
          You scored {score} out of {quiz.questions.length}
        </Typography>
      )}
    </Box>
  );
};

export default TakeQuiz;