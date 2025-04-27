import { initializeApp , getApp, getApps } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";


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
const auth = getAuth(app);
const db = getFirestore(app);