import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const app = initializeApp(JSON.parse(process.env.REACT_APP_FIREBASE_TOKEN));
export const auth = getAuth(app);
export const fireStoreDB = getFirestore(app);
export default app;
