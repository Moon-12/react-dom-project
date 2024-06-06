import { useNavigate } from "react-router-dom";
import uiMetaData from "../env/commonUIMetadata.json";
import Input from "../Input/Input";
import { validators } from "../../utils/fieldValidation";
import { FormProvider, useForm } from "react-hook-form";
import "./LoginPage.css";
import { signInGoogleThunk } from "../../redux/slice/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { GoogleIcon } from "../../icons/GoogleIcon";

const LoginPage = () => {
  const methods = useForm();

  const dispatch = useDispatch();
  const isLoggedIn = useSelector(
    (state) => state.auth.loginResponse.isLoggedIn
  );
  const { login } = uiMetaData;
  const navigate = useNavigate();

  const handleGoogleSignInFn = async () => {
    await dispatch(signInGoogleThunk());
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
