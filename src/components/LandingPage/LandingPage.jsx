import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { auth } from "../../firebase/firebaseConfig";
import { signInAnonymously } from "firebase/auth";
import { Button } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import "./LandingPage.css";
import CodeIcon from "@mui/icons-material/Code";
import { GoogleIcon } from "../../icons/GoogleIcon";
import CatAnimation from "./CatAnimation/CatAnimation";

const LandingPage = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.loginResponse);
  const navigate = useNavigate();

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
  return (
    <>
      <div className="landing-container">
        <div>
          <CodeIcon />
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
        <CatAnimation />
      </div>
    </>
  );
};

export default LandingPage;
