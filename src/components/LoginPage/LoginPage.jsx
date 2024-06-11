import { useNavigate } from "react-router-dom";
import uiMetaData from "../env/commonUIMetadata.json";
import "./LoginPage.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { GoogleIcon } from "../../icons/GoogleIcon";
import { auth } from "../../firebase/firebaseConfig";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const LoginPage = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.loginResponse);
  const [err, setErr] = useState("");
  const { login } = uiMetaData;
  const navigate = useNavigate();

  const handleGoogleSignInFn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      setErr(err.message);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/landing-page");
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="login-container">
      <h2>{login.heading}</h2>
      <button className="social-btn" onClick={handleGoogleSignInFn}>
        <div className="social-wrapper">
          <span>
            <GoogleIcon />
          </span>
          <span className="social-text">Sign in with Google</span>
        </div>
      </button>
    </div>
  );
};

export default LoginPage;
