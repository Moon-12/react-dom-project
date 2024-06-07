import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const app = initializeApp(JSON.parse(process.env.REACT_APP_FIREBASE_TOKEN));
export const auth = getAuth(app);

export default app;
