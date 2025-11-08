// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
// 🔥 Firebase Config (replace with your Firebase project details)
const firebaseConfig = {
  apiKey: "AIzaSyB...your_real_key...",
  authDomain: "pak-crm-app.firebaseapp.com",
  projectId: "pak-crm-app",
  storageBucket: "pak-crm-app.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456",
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();
