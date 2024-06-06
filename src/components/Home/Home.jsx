import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
  const isLoggedIn = useSelector(
    (state) => state.auth.loginResponse.isLoggedIn
  );
  useEffect(() => {
    console.count("home loggedin state change");
  }, [isLoggedIn]);

  return (
    <>
      <div>Home page</div>
      <Link to="/login">
        <button>Login</button>
      </Link>
      {/* <Link to="/sign-up">
        <button>SignUp</button>
      </Link> */}
    </>
  );
};

export default Home;
