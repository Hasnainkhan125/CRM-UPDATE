import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, roles = [] }) => {
  const loggedIn = localStorage.getItem("loggedIn") === "true";
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");

  // 🔹 Not logged in → go to login
  if (!loggedIn) {
    return <Navigate to="/login" replace />;
  }

  // 🔹 If no role info, assume "user"
  const userRole = currentUser.role || (currentUser.email === "admin@gmail.com" ? "admin" : "user");

  // 🔹 Role-based access control
  if (roles.length > 0 && !roles.includes(userRole)) {
    if (userRole === "admin") {
      return <Navigate to="/admin/dashboard" replace />;
    }
    return <Navigate to="/user-dashboard" replace />;
  }

  // ✅ Access granted
  return children;
};

export default ProtectedRoute;
