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
import { Link } from "react-router-dom";
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
const pages = [
  "Resume",
  "React tips",
  "React Interview question",
  "Mini DOM projects",
  "About Me",
];

const HeaderBar = () => {
  const { appName } = environment;
  const role = useSelector((state) => state.auth.role);
  const loginResponse = useSelector((state) => state.auth.loginResponse);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [activeHeader, setActiveHeader] = useState(appName);
  const headers = useSelector((state) => state.header.headers);
  const dispatch = useDispatch();

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

  const handleCloseNavMenu = () => {};

  const handleLogoutFn = async () => {
    try {
      await signOut(auth);
    } catch (error) {}
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
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
              <MenuItem>
                <Typography textAlign="center">Home</Typography>
              </MenuItem>
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <img src={logo} alt="logo" className="mobile-view-logo" />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            My Portfolio
          </Typography>
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
                  "&.Mui-selected": {
                    backgroundColor: "#246db5",
                  },
                }}
              >
                {appName}
              </ListItemButton>
            </Link>
            {headers.map((header) => {
              const headerTobeDisplayed = header.enable ? (
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
                      "&.Mui-selected": {
                        backgroundColor: "#246db5",
                      },
                    }}
                  >
                    {header.header_name}
                  </ListItemButton>
                </Link>
              ) : (
                ""
              );
              return headerTobeDisplayed;
            })}
          </Box>
          <div className="right-icons-wrapper">
            <ListItemButton href="https://github.com/Moon-12">
              <GitHubIcon />
            </ListItemButton>
            <ListItemButton href="https://www.linkedin.com/in/ashwija-nayak/">
              <LinkedInIcon />
            </ListItemButton>
            {loginResponse ? (
              <Link
                to="/login"
                className="header-links"
                onClick={handleLogoutFn}
              >
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
