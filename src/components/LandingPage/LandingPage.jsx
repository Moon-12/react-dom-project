import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { auth } from "../../firebase/firebaseConfig";
import { signInAnonymously } from "firebase/auth";
import KeyIcon from "@mui/icons-material/Key";
import { Button } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import "./LandingPage.css";
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
      <div>Home page</div>
      <div className="login-action-btn-wrapper ">
        <Link to="/login">
          <Button variant="contained">
            {" "}
            <KeyIcon />
            Login
          </Button>
        </Link>

        <Button variant="contained" onClick={handleGuestLoginFn}>
          <PersonIcon />
          Login as guest
        </Button>
      </div>
    </>
  );
};

export default LandingPage;
