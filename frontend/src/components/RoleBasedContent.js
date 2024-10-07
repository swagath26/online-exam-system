import React from 'react';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const RoleBasedContent = ({ role }) => {
  if (role === 'teacher') {
    return (
      <Box>
        <Typography variant="h5">Teacher's Dashboard</Typography>
        <Link to="/create-quiz">Create a New Quiz</Link>
        {/* Add more teacher-specific features here */}
      </Box>
    );
  }

  if (role === 'student') {
    return (
      <Box>
        <Typography variant="h5">Student's Dashboard</Typography>
        <Link to="/">Take a Quiz</Link>
        <Link to="/results">View My Results</Link>
      </Box>
    );
  }

  if (role === 'admin') {
    return (
      <Box>
        <Typography variant="h5">Admin Dashboard</Typography>
        <Link to="/manage-users">Manage Users</Link>
      </Box>
    );
  }

  return <Typography>Invalid role</Typography>;
};

export default RoleBasedContent;