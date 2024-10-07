import React, { useEffect, useState } from 'react';
import api from '../services/api';

const StudentResults = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await api.get('/results/student', {
          headers: { 'x-auth-token': token }
        });
        setResults(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchResults();
  }, []);

  return (
    <div>
      <h1>My Quiz Results</h1>
      <ul>
        {results.map((result) => (
          <li key={result._id}>
            {result.quizId.title}: {result.score}/{result.totalQuestions}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentResults;