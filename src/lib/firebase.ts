import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCcb2n9qnMg6foqoFfgttUX4Hwp0_wb0cY",
  authDomain: "cfa-tc.firebaseapp.com",
  projectId: "cfa-tc",
  storageBucket: "cfa-tc.firebasestorage.app",
  messagingSenderId: "490657210291",
  appId: "1:490657210291:web:bb31bb2dde71180f02b5c6",
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
export default app;
