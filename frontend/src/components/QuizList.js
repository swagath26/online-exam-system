import React, { useEffect, useState } from 'react';
import { Box, List, ListItem, ListItemText, Typography, Button } from '@mui/material';
import api from '../services/api';
import { Link } from 'react-router-dom';

const QuizList = ({ role }) => {
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
            {role === 'student' && (
              <Button component={Link} to={`/take-quiz/${quiz._id}`} variant="contained">
                Take Quiz
              </Button>
            )}
            {role === 'teacher' && (
              <>
                <Button component={Link} to={`/edit-quiz/${quiz._id}`} variant="contained">
                  Edit
                </Button>
                <Button variant="contained" color="secondary">
                  Delete
                </Button>
              </>
            )}
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default QuizList;