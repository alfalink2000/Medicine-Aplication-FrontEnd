import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const PublicRoute = ({ children }) => {
  const user = useSelector((state) => state.auth.user);
  const uid = user ? user.uid : null;

  return !!uid ? <Navigate to="/admin-dashboard" /> : children;
};

export const PrivateRoute = ({ children }) => {
  const user = useSelector((state) => state.auth.user);
  const uid = user ? user.uid : null;

  return !!uid ? children : <Navigate to="/login" />;
};
