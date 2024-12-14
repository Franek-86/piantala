import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [loading, setLoading] = useState(true); // New loading state
  const [submissionError, setSubmissionError] = useState("");
  const [userRole, setUserRole] = useState(null);
  const [userId, setUserId] = useState(null);

  const [isRegister, setIsRegister] = useState(null);
  const token = localStorage.getItem("userToken");

  const serverDomain = process.env.REACT_APP_DOMAIN_NAME_SERVER;
  const loginOrRegister = async (data) => {
    console.log("sta?", serverDomain);
    const { email, password } = data;
    const endpoint = isRegister
      ? `${serverDomain}/api/auth/register`
      : `${serverDomain}/api/auth/login`;

    const response = await axios.post(endpoint, {
      email,
      user_password: password,
    });
    return response;
  };
  useEffect(() => {
    if (token) {
      setUserToken(token);
      setIsAuthenticated(true);

      //
      console.log("else", token);
      console.log("else2");

      try {
        const decodedToken = jwtDecode(token);
        console.log("userId decodedfrom local storage", decodedToken);
        setUserId(decodedToken.id);
        setUserRole(decodedToken.role);
      } catch (error) {
        console.error("Failed to decode token:", error);
        setSubmissionError("Invalid token.");
        return;
      }
    }

    setLoading(false);
  }, [userId, token]);

  const handleLogout = async () => {
    try {
      await axios.post(`${serverDomain}/api/auth/logout`);

      localStorage.removeItem("userToken");
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        userToken,
        isAuthenticated,
        loading,
        setUserRole,
        handleLogout,
        setIsRegister,
        isRegister,
        userRole,
        userId,
        token,
        loginOrRegister,
        setIsAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
