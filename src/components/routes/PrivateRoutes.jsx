// PrivateRoute.js
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const loginResponse = useSelector((state) => state.auth.loginResponse);
  const dispatch = useDispatch();

  return loginResponse.isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
