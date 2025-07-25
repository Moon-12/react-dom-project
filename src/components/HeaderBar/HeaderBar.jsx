import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import { Link, useNavigate } from "react-router-dom";
import "./HeaderBar.css";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import { useDispatch, useSelector } from "react-redux";
import {
  clearHeaders,
  fetchHeader,
  setcurrentHeader,
  setcurrentHeaderRoute,
} from "../../redux/slice/headerSlice";
import { useEffect } from "react";
import { setMenu } from "../../redux/slice/menuSlice";
import { useRef } from "react";
import logo from "../../assets/projectlogo.png";
import { environment } from "../../environments/environment";
import ListItemButton from "@mui/material/ListItemButton";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { useState } from "react";

const HeaderBar = () => {
  const { appName } = environment;
  const role = useSelector((state) => state.auth.role);
  const loginResponse = useSelector((state) => state.auth.loginResponse);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [activeHeader, setActiveHeader] = useState(appName);
  const headers = useSelector((state) => state.header.headers);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const prevHeaderRef = useRef(null);

  const handleHeaderClick = (header) => {
    const { id, route } = header;
    //dipatch action only when current header is not same as prev header
    if (
      (prevHeaderRef.current && prevHeaderRef.current !== header) ||
      prevHeaderRef.current === null
    ) {
      setAnchorElNav(null);
      dispatch(setcurrentHeaderRoute({ currentHeaderRoute: route }));
      //filter menu based on header clicked
      const menu = headers
        .filter((header) => header.id === id)
        .map((header) => header.subMenus);
      dispatch(setMenu({ menu }));
    }
    setActiveHeader(header);
    // Update the previous header ref
    prevHeaderRef.current = header;
    dispatch(setcurrentHeader({ currentHeader: header }));
    handleCloseNavMenu();
  };

  useEffect(() => {
    if (role) {
      dispatch(fetchHeader({ role }));
    } else {
      dispatch(clearHeaders());
    }
  }, [role, dispatch]);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleLogoutFn = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {}
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: !loginResponse ? "none" : "flex", md: "none" },
            }}
          >
            {loginResponse && (
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            )}
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {headers.map((header) => {
                const headerTobeDisplayed = header.enable && (
                  <Link
                    key={header.id}
                    to={`${header.route}`}
                    className="mobile-view-header-links"
                  >
                    <MenuItem onClick={() => handleHeaderClick(header)}>
                      <Typography textAlign="center">
                        {" "}
                        {header.header_name}
                      </Typography>
                    </MenuItem>
                  </Link>
                );
                return headerTobeDisplayed;
              })}
            </Menu>
          </Box>
          <Link to="/">
            <img src={logo} alt="logo" className="mobile-view-logo" />
          </Link>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Link to="/" className="header-links">
              <img src={logo} alt="logo" className="logo" />
              <ListItemButton
                selected={activeHeader === appName}
                onClick={() => setActiveHeader(appName)}
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                }}
              >
                {appName}
              </ListItemButton>
            </Link>
            {headers.map((header) => {
              const headerTobeDisplayed = header.enable && (
                <Link
                  className="header-links"
                  key={header.id}
                  to={`${header.route}`}
                >
                  <ListItemButton
                    selected={activeHeader === header}
                    onClick={() => handleHeaderClick(header)}
                    sx={{
                      my: 2,
                      color: "white",
                      display: "block",
                    }}
                  >
                    {header.header_name}
                  </ListItemButton>
                </Link>
              );
              return headerTobeDisplayed;
            })}
          </Box>
          <div className="right-icons-wrapper">
            <ListItemButton href="https://github.com/Moon-12" target="_blank">
              <GitHubIcon />
            </ListItemButton>
            <ListItemButton
              href="https://www.linkedin.com/in/ashwija-nayak/"
              target="_blank"
            >
              <LinkedInIcon />
            </ListItemButton>
            {loginResponse ? (
              <Link className="header-links" onClick={handleLogoutFn}>
                <ListItemButton
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  Logout
                </ListItemButton>
              </Link>
            ) : null}
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default HeaderBar;
