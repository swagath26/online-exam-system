import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ role }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/auth');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Online Examination System
        </Typography>
        <Box>
          <Button component={Link} to="/dashboard" color="inherit">
            Dashboard
          </Button>
          {role === 'teacher' && (
            <Button component={Link} to="/create-quiz" color="inherit">
              Create Quiz
            </Button>
          )}
          {role === 'student' && (
            <>
              <Button component={Link} to="/take-quiz" color="inherit">
                Take Quiz
              </Button>
              <Button component={Link} to="/results" color="inherit">
                My Results
              </Button>
            </>
          )}
          {role === 'admin' && (
            <Button component={Link} to="/manage-users" color="inherit">
              Manage Users
            </Button>
          )}
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;