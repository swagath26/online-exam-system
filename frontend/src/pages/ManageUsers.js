import React, { useEffect, useState } from 'react';
import { Box, List, ListItem, ListItemText, Button, Typography } from '@mui/material';
import api from '../services/api';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get('/users');
        setUsers(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    try {
      await api.delete(`/users/${userId}`);
      setUsers(users.filter((user) => user._id !== userId));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4">Manage Users</Typography>
      <List>
        {users.map((user) => (
          <ListItem key={user._id}>
            <ListItemText primary={user.name} secondary={user.email} />
            <Button variant="contained" onClick={() => handleDelete(user._id)}>
              Delete
            </Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ManageUsers;