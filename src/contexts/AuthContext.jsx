// src/context/AuthContext.jsx
import React, { createContext, useContext, useState } from 'react';

export const AuthContext = createContext();

const hardcodedUsers = [
  { email: 'alice@example.com', password: '1234' },
  { email: 'bob@example.com', password: '1234' },
  { email: 'carol@example.com', password: '1234' }
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (email, password) => {
    const found = hardcodedUsers.find(u => u.email === email && u.password === password);
    if (found) setUser({ email });
    return !!found;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);