import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import CreateQuiz from './pages/CreateQuiz';
import TakeQuiz from './pages/TakeQuiz';
import QuizList from './pages/QuizList';
import QuizResult from './pages/QuizResult';
import ManageUsers from './pages/ManageUsers';
import Navbar from './components/Navbar';
import api from './services/api';

const App = () => {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true); // To track loading state

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const res = await api.get('/auth/me'); // Fetch user data (including role)
        setRole(res.data.role);
      } catch (err) {
        console.error(err);
        setRole(null); // If there's an error, set role to null
      } finally {
        setLoading(false); // Loading finished
      }
    };
    fetchUserRole();
  }, []);

  // While loading, render a simple loading message
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Navbar role={role} />
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-quiz" element={role === 'teacher' ? <CreateQuiz /> : <Navigate to="/dashboard" />} />
        <Route path="/take-quiz/:quizId" element={role === 'student' ? <TakeQuiz /> : <Navigate to="/dashboard" />} />
        <Route path="/results" element={role === 'student' ? <QuizResult /> : <Navigate to="/dashboard" />} />
        <Route path="/manage-users" element={role === 'admin' ? <ManageUsers /> : <Navigate to="/dashboard" />} />
        <Route path="/" element={<Navigate to="/auth" />} />
        {/* Catch-all for unmatched routes */}
        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
    </Router>
  );
};

export default App;