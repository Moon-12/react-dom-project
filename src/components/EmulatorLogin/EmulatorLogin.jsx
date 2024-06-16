import { useEffect, useState } from "react";
import { auth } from "../../firebase/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const EmulatorLogin = () => {
  const [email, setEmail] = useState("test56@gmail.com");
  const [password, setPassword] = useState("helloworld");
  const isLoggedIn = useSelector((state) => !!state.auth.loginResponse);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/landing-page");
    }
  }, [isLoggedIn, navigate]);

  const handleSubmit = (e) => {
    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log("here");
    });
  };
  return (
    <>
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSubmit}>Login</button>
    </>
  );
};
export default EmulatorLogin;
