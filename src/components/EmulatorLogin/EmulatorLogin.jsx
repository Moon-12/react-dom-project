import { useEffect, useState } from "react";
import { auth } from "../../firebase/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./EmulatorLogin.css";
const EmulatorLogin = () => {
  const [email, setEmail] = useState("test56@gmail.com");
  const [password, setPassword] = useState("helloworld");
  const isLoggedIn = useSelector((state) => !!state.auth.loginResponse);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/s");
    }
  }, [isLoggedIn, navigate]);

  const handleSubmit = (e) => {
    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
      // Signed in
      //   const user = userCredential.user;
    });
  };
  return (
    <div className="emul-login-wrapper">
      <TextField
        id="outlined-basic"
        label="Email"
        variant="outlined"
        defaultValue={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <TextField
        id="outlined-password-input"
        label="Password"
        type="password"
        autoComplete="current-password"
        defaultValue={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <div className="btn-wrapper">
        <Button variant="contained" onClick={() => navigate("/")}>
          Back
        </Button>
        <Button variant="contained" onClick={handleSubmit}>
          Login
        </Button>
      </div>
    </div>
  );
};
export default EmulatorLogin;
