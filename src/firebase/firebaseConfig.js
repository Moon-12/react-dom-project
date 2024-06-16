import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

const app = initializeApp(JSON.parse(process.env.REACT_APP_FIREBASE_TOKEN));
export const auth = getAuth(app);
export const fireStoreDB = getFirestore(app);

if (process.env.NODE_ENV === "development") {
  connectAuthEmulator(auth, "http://127.0.0.1:9099");
  connectFirestoreEmulator(fireStoreDB, "localhost", 8080);
}
export default app;
