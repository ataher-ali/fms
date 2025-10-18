import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import Loader from "../Pages/Loader/Loader";

export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    // Show loading while checking auth
    return <Loader />;
  }

  if (!user) {
    // If not logged in, redirect to login page
    return <>
    <Loader/>
    <Navigate to="/login" replace />
    </>;
  }

  // If logged in, show the protected page
  return children;
}
// PrivateRoute.jsx