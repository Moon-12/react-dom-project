import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { auth } from "../../firebase/firebaseConfig";
import { signInAnonymously } from "firebase/auth";
import { Button, IconButton } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import "./LandingPage.css";
import CodeIcon from "@mui/icons-material/Code";
import { GoogleIcon } from "../../icons/GoogleIcon";
import CatAnimation from "./CatAnimation/CatAnimation";
import Tooltip from "@mui/material/Tooltip";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import AboutMe from "./AboutMe/AboutMe";

const LandingPage = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.loginResponse);
  const navigate = useNavigate();
  const ref = useRef();
  useEffect(() => {
    console.count("home loggedin state change");
    if (isLoggedIn) {
      navigate("/s");
    }
  }, [isLoggedIn, navigate]);

  const handleGuestLoginFn = () => {
    signInAnonymously(auth)
      .then(() => {
        // Signed in..
      })
      .catch((error) => {
        // ...error
      });
  };
  const handleDownArrowClick = () => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <>
      <div className="landing-container">
        <div className="code-icon-wrapper">
          <Tooltip title="This site is open source!">
            <a
              className="code-icon-link"
              href={`https://github.com/Moon-12/react-dom-project`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <CodeIcon sx={{ fontSize: "4em" }} />
            </a>
          </Tooltip>
        </div>

        <div className="page-title">Ashwija Nayak</div>
        <div>React Developer, Photographer, Cat Lover</div>
        <div className="login-action-btn-wrapper ">
          <Link to="/login">
            <Button variant="contained">
              <div className="button-content">
                <div className="col ">
                  <GoogleIcon />
                </div>
                <div className="col">Signup with Google</div>
              </div>
            </Button>
          </Link>
          <Button onClick={handleGuestLoginFn} variant="contained">
            <div className="button-content">
              <div className="col">
                <PersonIcon />
              </div>
              <div className="col"> Guest Login</div>
            </div>
          </Button>
        </div>
        <IconButton onClick={handleDownArrowClick}>
          <ArrowDropDownCircleIcon fontSize="large" />
        </IconButton>
      </div>
      <div className="floating-cat">
        <CatAnimation />
      </div>
      <AboutMe ref={ref} />
    </>
  );
};

export default LandingPage;
