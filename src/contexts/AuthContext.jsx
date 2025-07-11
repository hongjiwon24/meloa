// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState({
    isLoggedIn: false,
    role: null, // "user" or "admin"
  });

  const login = (role) => setAuth({ isLoggedIn: true, role });
  const logout = () => setAuth({ isLoggedIn: false, role: null });

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
