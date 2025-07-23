// PrivateRoute.js
import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const loginResponse = useSelector((state) => state.auth.loginResponse);

  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (!loginResponse) {
      const timer = setTimeout(() => {
        setRedirect(true);
      }, 1500); // 1000 milliseconds delay

      // Clean up the timeout if the component unmounts
      return () => clearTimeout(timer);
    }
  }, [loginResponse]);

  if (loginResponse) {
    return <Outlet />;
  }

  return redirect ? <Navigate to="/" /> : null;
};

export default PrivateRoute;
