import { Outlet } from "react-router-dom";

import "./RootComp.css";
import HeaderBar from "./HeaderBar/HeaderBar";
import SideMenu from "./SideMenu/SideMenu";
import { useEffect } from "react";
import { auth } from "../firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setLogInResponse } from "../redux/slice/authSlice";

const RootComp = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    //This is a firebase method,which gets called automatically when auth state changes
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setLogInResponse(user.uid));
      } else {
        dispatch(setLogInResponse(""));
      }
    });
  }, [dispatch]);

  return (
    <div className="container">
      <header className="header">
        <HeaderBar />
      </header>
      <div className="content-body">
        <nav className="sidenav">
          <SideMenu />
        </nav>
        <main className="content">
          <Outlet />
        </main>
        <aside className="ads"></aside>
      </div>
      <footer className="footer"></footer>
    </div>
  );
};
export default RootComp;
