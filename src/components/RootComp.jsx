import { Outlet } from "react-router-dom";

import "./RootComp.css";
import HeaderBar1 from "./HeaderBar/HeaderBar1";
import SideMenu from "./SideMenu/SideMenu";
import { useEffect } from "react";
import { auth, fireStoreDB } from "../firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setLogInResponse } from "../redux/slice/authSlice";
import Footer from "./Footer/Footer";
import { getDoc, doc } from "firebase/firestore";

const RootComp = () => {
  const dispatch = useDispatch();

  const getUserRole = async (user) => {
    const docRef = doc(fireStoreDB, "user_profile", `${auth.currentUser.uid}`);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return "admin";
    } else if (user.isAnonymous) {
      return "anonymous";
    } else {
      return "super_guest";
    }
  };
  useEffect(() => {
    //This is a firebase method,which gets called automatically when auth state changes
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const role = await getUserRole(user);
        dispatch(setLogInResponse({ uid: user.uid, role }));
      } else {
        dispatch(setLogInResponse(""));
      }
    });
  }, [dispatch]);

  return (
    <div className="container">
      <header className="header">
        <HeaderBar1 />
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
      <footer className="footer">
        <Footer />
      </footer>
    </div>
  );
};
export default RootComp;
