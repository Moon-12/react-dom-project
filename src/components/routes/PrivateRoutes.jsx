// PrivateRoute.js
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const loginResponse = useSelector((state) => state.auth.loginResponse);

  return loginResponse.isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
