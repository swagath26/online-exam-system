import React, { useEffect, useState } from 'react';
import { Box, List, ListItem, ListItemText, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import api from '../services/api';

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const res = await api.get('/quizzes');
        setQuizzes(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchQuizzes();
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4">Available Quizzes</Typography>
      <List>
        {quizzes.map((quiz) => (
          <ListItem key={quiz._id}>
            <ListItemText primary={quiz.title} secondary={quiz.description} />
            <Button component={Link} to={`/take-quiz/${quiz._id}`} variant="contained">
              Take Quiz
            </Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default QuizList;