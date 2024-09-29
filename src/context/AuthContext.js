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

  // Mock function to register a user (you can replace with API call)
  // const register = (email, password) => {
  //   const token = `${email}-token`; // In real apps, this will come from your API
  //   setUserToken(token);
  //   localStorage.setItem("userToken", token);
  // };

  // Mock function to log in (you can replace with API call)
  // const login = (email, password) => {
  //   const token = `${email}-token`; // Same as registration token for simplicity
  //   setUserToken(token);
  //   localStorage.setItem("userToken", token);
  // };

  const logout = () => {
    setUserToken(null);
    localStorage.removeItem("userToken");
  };

  return (
    <AuthContext.Provider value={{ userToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
