import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Loading from "../pages/Loading";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useContext(AuthContext);
  if (loading) {
    return <Loading />; // Optionally show a loading indicator
  }

  if (!isAuthenticated) {
    // Redirect to the login page if not authenticated
    return <Navigate to='/' />;
  }

  return children; // Render the children components if authenticated
};

export default ProtectedRoute;
