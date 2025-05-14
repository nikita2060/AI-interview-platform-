import { initializeApp , getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth,GoogleAuthProvider, signInWithPopup } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyAtSYmyHmHcyDxAd8GB0IUTrqgH2eylBpA",
  authDomain: "interviewprep-77646.firebaseapp.com",
  projectId: "interviewprep-77646",
  storageBucket: "interviewprep-77646.firebasestorage.app",
  messagingSenderId: "1086922984391",
  appId: "1:1086922984391:web:49f05261989a78a99ce7e2",
  measurementId: "G-8546Z0S3WX"
};

// Initialize Firebase
const app = !getApps.length?initializeApp(firebaseConfig):getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;
    const user = result.user;

    const idToken = await user.getIdToken();

    // Send to server to store in DB and set session
    await fetch("/api/google-auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        idToken,
      }),
    });

    return { user, token, idToken }; // ✅ returning all
  } catch (error) {
    console.error("Error signing in with Google: ", error);
    throw error;
  }
};

