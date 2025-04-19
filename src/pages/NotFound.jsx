import React from 'react';
import { Link } from 'react-router';

const NotFound = () => {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>404 - Page Not Found</h1>
      <Link to="/">
        <button>Go to Home</button>
      </Link>
    </div>
  );
};

export default NotFound;