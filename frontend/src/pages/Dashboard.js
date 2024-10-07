import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import api from '../services/api';
import RoleBasedContent from '../components/RoleBasedContent';

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await api.get('/auth/me', {
          headers: { 'x-auth-token': token },
        });
        setUser(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUserData();
  }, []);

  if (!user) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4">Welcome, {user.name}</Typography>
      <RoleBasedContent role={user.role} />
    </Box>
  );
};

export default Dashboard;