import React, { useEffect, useState } from 'react';
import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';
import api from '../services/api';

const QuizResult = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await api.get('/results');
        setResults(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchResults();
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4">Your Quiz Results</Typography>
      <List>
        {results.map((result) => (
          <ListItem key={result.quizId}>
            <ListItemText
              primary={`Quiz: ${result.quizTitle}`}
              secondary={`Score: ${result.score}/${result.total}`}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default QuizResult;