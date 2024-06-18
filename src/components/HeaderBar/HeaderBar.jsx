import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Link } from "react-router-dom";
import "./HeaderBar.css";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import { useDispatch, useSelector } from "react-redux";
import {
  clearHeaders,
  fetchHeader,
  setcurrentHeaderRoute,
} from "../../redux/slice/headerSlice";
import { useEffect } from "react";
import { setMenu } from "../../redux/slice/menuSlice";

const pages = [
  "Resume",
  "React tips",
  "React Interview question",
  "Mini DOM projects",
  "About Me",
];

const HeaderBar1 = () => {
  const role = useSelector((state) => state.auth.role);
  const loginResponse = useSelector((state) => state.auth.loginResponse);
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const headers = useSelector((state) => state.header.headers);
  const dispatch = useDispatch();

  const handleHeaderClick = (header) => {
    const { id, route } = header;
    setAnchorElNav(null);
    dispatch(setcurrentHeaderRoute({ currentHeaderRoute: route }));
    //filter menu based on header clicked
    const menu = headers
      .filter((header) => header.id === id)
      .map((header) => header.subMenus);
    dispatch(setMenu({ menu }));
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
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />

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
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
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
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Link to="/" className="header-links">
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Home
              </Button>
            </Link>
            {headers.map((header) => (
              <Link
                className="header-links"
                key={header.id}
                to={`/landing-page${header.route}`}
              >
                <Button
                  onClick={() => handleHeaderClick(header)}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {header.header_name}
                </Button>
              </Link>
            ))}
          </Box>
          {loginResponse ? (
            <Link to="/login" className="header-links" onClick={handleLogoutFn}>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Logout
              </Button>
            </Link>
          ) : null}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default HeaderBar1;
