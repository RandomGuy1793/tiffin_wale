import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute(props) {
  const { children } = props;
  const { isLoggedIn, isCustomer } = props.auth;
  if (isLoggedIn && !isCustomer) return children;
  return <Navigate to="/tiffin-vendor/login" replace />;
}

export default ProtectedRoute;
