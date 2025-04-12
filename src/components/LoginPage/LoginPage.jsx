import { useNavigate } from "react-router-dom";
import uiMetaData from "../env/commonUIMetadata.json";
import "./LoginPage.css";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { GoogleIcon } from "../../icons/GoogleIcon";
import { auth } from "../../firebase/firebaseConfig";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const LoginPage = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.loginResponse);
  const { login } = uiMetaData;
  const navigate = useNavigate();

  const handleGoogleSignInFn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {}
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/s");
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
