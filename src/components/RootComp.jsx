import { Outlet, useLocation } from "react-router-dom";

import "./RootComp.css";
import HeaderBar from "./HeaderBar/HeaderBar";
import SideMenu from "./SideMenu/SideMenu";

const RootComp = () => {
  const location = useLocation();

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
