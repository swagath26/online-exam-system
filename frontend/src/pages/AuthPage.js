import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const toggleMode = () => setIsLogin(!isLogin);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post(`/auth/${isLogin ? 'login' : 'register'}`, form);
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: 400, margin: '0 auto' }}>
      <Typography variant="h5">{isLogin ? 'Login' : 'Sign Up'}</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Password"
          name="password"
          value={form.password}
          onChange={handleChange}
          margin="normal"
          type="password"
        />
        <Button type="submit" variant="contained" fullWidth sx={{ my: 2 }}>
          {isLogin ? 'Login' : 'Sign Up'}
        </Button>
        <Button fullWidth onClick={toggleMode}>
          {isLogin ? 'Switch to Sign Up' : 'Switch to Login'}
        </Button>
      </form>
    </Box>
  );
};

export default AuthPage;