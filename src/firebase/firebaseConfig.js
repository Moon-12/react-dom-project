import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { connectStorageEmulator, getStorage, ref } from "firebase/storage";

const app = initializeApp(JSON.parse(process.env.REACT_APP_FIREBASE_TOKEN));
export const auth = getAuth(app);
export const fireStoreDB = getFirestore(app);

export const storage = getStorage();

if (process.env.NODE_ENV === "development") {
  connectAuthEmulator(auth, "http://127.0.0.1:9099");
  connectFirestoreEmulator(fireStoreDB, "localhost", 8080);
  connectStorageEmulator(storage, "localhost", 9199);
}
export default app;
