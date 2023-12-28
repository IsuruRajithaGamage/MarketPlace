// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "marketplace-6a1ef.firebaseapp.com",
  projectId: "marketplace-6a1ef",
  storageBucket: "marketplace-6a1ef.appspot.com",
  messagingSenderId: "776641396501",
  appId: "1:776641396501:web:638a84b4bebaf38711b31c",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
