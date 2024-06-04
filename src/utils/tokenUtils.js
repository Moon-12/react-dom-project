import { jwtDecode } from "jwt-decode";

const authTokenKey = "authToken";

export const setSessionToken = (token) => {
  sessionStorage.setItem(authTokenKey, token);
};

export const getSessionLoginResponse = () => {
  const accessToken = sessionStorage.getItem(authTokenKey);
  let decodedToken;
  if (accessToken) {
    decodedToken = jwtDecode(accessToken);
  }

  return {
    ...decodedToken,
    isLoggedIn:
      decodedToken && decodedToken.hasOwnProperty("exp")
        ? checkLoggedIn(decodedToken.exp)
        : false,
  };
};

export const checkLoggedIn = (expiryTime) => {
  // const currentTime = Date.now();
  // const timeRemaining = expiryTime * 1000 - currentTime;
  // return timeRemaining > 0;
  return true;
};

export const removeSessionToken = () => {
  sessionStorage.removeItem(authTokenKey);
};
