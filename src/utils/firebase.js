import firebase from "firebase";

// import firestore
import "firebase/firestore";
import "firebase/auth";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBf15Cr4OTLHWDk6xQDMXsFQ3_tqWpWoTc",
  authDomain: "todotest-1dc3a.firebaseapp.com",
  projectId: "todotest-1dc3a",
  storageBucket: "todotest-1dc3a.appspot.com",
  messagingSenderId: "981952092003",
  appId: "1:981952092003:web:82b9f6f8a66f5c49aca556",
  measurementId: "G-W1Q712MHXR",
};

// Initialize firebase
firebase.initializeApp(firebaseConfig);

// Required firebase modules
export const auth = firebase.auth;
export const firestore = firebase.firestore;

// export firebas object
export default firebase;
