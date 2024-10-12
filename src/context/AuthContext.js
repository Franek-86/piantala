// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from "react";

// Create the AuthContext
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [loading, setLoading] = useState(true); // New loading state
  // On app load, check localStorage for a token
  useEffect(() => {
    const token = localStorage.getItem("userToken");
    console.log("hdwgcvegycvyewgqcvgv", token);
    if (token) {
      setUserToken(token);
    }
    setLoading(false); // Set loading to false after checking
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
  console.log(isAuthenticated);
  return (
    <AuthContext.Provider
      value={{ userToken, isAuthenticated, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
