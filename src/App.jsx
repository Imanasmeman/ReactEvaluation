import React from 'react';
import { Routes, Route, Navigate } from 'react-router';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import AddCourse from './pages/AddCourse';
import EditCourse from './pages/EditCourse';
import NotFound from './pages/NotFound';
import CoursesPage from './pages/CoursesPage';
import CourseDetailPage from './pages/CourseDetailPage';
import LoginPage from './pages/LoginPage';
import { useAuth } from './hooks/useAuth';

const App = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/courses" element={<CoursesPage />} />
      <Route path="/courses/:id" element={<CourseDetailPage />} />
      <Route path="/login" element={<LoginPage />} />
      {user ? (
        <>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/new" element={<AddCourse />} />
          <Route path="/dashboard/edit/:id" element={<EditCourse />} />
        </>
      ) : (
        <Route path="/dashboard/*" element={<Navigate to="/login" />} />
      )}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App; 