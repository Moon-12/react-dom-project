import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import "./Welcome.css";

const Welcome = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.loginResponse);
  const role = useSelector((state) => state.auth.role);
  const userName = useSelector((state) => state.auth.userName);
  return (
    <div className="welcome-wrapper">
      {" "}
      {isLoggedIn ? (
        <Typography variant="h3">
          Welcome! {`${role === "anonymous" ? "Anonymous User" : userName}`}
        </Typography>
      ) : (
        ""
      )}
    </div>
  );
};
export default Welcome;
