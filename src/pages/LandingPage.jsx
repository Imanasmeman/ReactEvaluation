import React from 'react';
import { Link } from 'react-router';

const LandingPage = () => {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Welcome MyCourse</h1>
      <p>Your one-stop platform for managing and exploring courses.</p>
      <div style={{ marginTop: '20px' }}>
        <Link to="/courses">
          <button style={{ marginRight: '10px' }}>Browse Courses</button>
        </Link> 
        <Link to="/login">
          <button>Login as Instructor </button>
        </Link>
      </div>
      <div style={{ marginTop: '20px', fontSize: '14px', color: '#555' }}>
  <p>
    <strong>Note:</strong> 
    Please use the following credentials to log in:
  </p>
  <ul>
    <li><strong>Email:</strong> alice@example.com, <strong>Password:</strong> 1234</li>
    <li><strong>Email:</strong> bob@example.com, <strong>Password:</strong> 1234</li>
    <li><strong>Email:</strong> carol@example.com, <strong>Password:</strong> 1234</li>
  </ul>
</div>
    </div>
  );
};

export default LandingPage;