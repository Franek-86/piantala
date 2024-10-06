// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from "react";

// Create the AuthContext
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);

  // On app load, check localStorage for a token
  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      setUserToken(token);
    }
  }, []);

  const login = (token) => {
    setUserToken(token);
    localStorage.setItem("userToken", token); // Store the token in localStorage
  };

  const logout = () => {
    setUserToken(null);
    localStorage.removeItem("userToken");
  };

  const isAuthenticated = !!userToken; // Convert token to boolean

  return (
    <AuthContext.Provider value={{ userToken, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
