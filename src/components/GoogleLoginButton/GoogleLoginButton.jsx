import { useNavigate } from "react-router-dom";
import "./GoogleLoginButton.css";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { GoogleIcon } from "../../icons/GoogleIcon";
import { auth } from "../../firebase/firebaseConfig";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Button } from "@mui/material";

const GoogleLoginButton = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.loginResponse);
  const navigate = useNavigate();

  const handleGoogleSignInFn = async () => {
    if (process.env.NODE_ENV === "development" && !isLoggedIn) {
      navigate("/emulator-login");
      return;
    }
    if (!isLoggedIn) {
      const provider = new GoogleAuthProvider();
      try {
        await signInWithPopup(auth, provider);
      } catch (err) {}
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/s");
    }
  }, [isLoggedIn, navigate]);

  return (
    <Button variant="contained" onClick={handleGoogleSignInFn}>
      <div className="button-content">
        <div className="col ">
          <GoogleIcon />
        </div>
        <div className="col">Signup with Google</div>
      </div>
    </Button>
  );
};

export default GoogleLoginButton;
