// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter, Routes, Route } from "react-router";
import { AuthProvider } from './contexts/AuthContext';
import { CourseProvider } from './contexts/CourseContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CourseProvider>
          <App />
        </CourseProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);