import { Typography, Container, Box } from "@mui/material";
import { useSelector } from "react-redux";
import "./Welcome.css";
import PortfolioTabs from "../PortfolioTabs/PortfolioTabs";

const Welcome = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.loginResponse);
  const role = useSelector((state) => state.auth.role);
  const userName = useSelector((state) => state.auth.userName);

  return (
    <div className="welcome-wrapper">
      {isLoggedIn && (
        <Typography variant="h3" component="h1">
          Welcome! {role === "anonymous" ? "Guest user" : userName}
        </Typography>
      )}
      <Container maxWidth="md">
        <Box mt={4}>
          <PortfolioTabs />
        </Box>
      </Container>
    </div>
  );
};

export default Welcome;
