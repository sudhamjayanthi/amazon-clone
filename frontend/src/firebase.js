import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAfrqGk6io41Wi4kzSUKMzWRb1ayIvL6go",
  authDomain: "clone-9c7fd.firebaseapp.com",
  databaseURL: "https://clone-9c7fd.firebaseio.com",
  projectId: "clone-9c7fd",
  storageBucket: "clone-9c7fd.appspot.com",
  messagingSenderId: "636295133629",
  appId: "1:636295133629:web:64ac5fd74405c2f526bad4",
  measurementId: "G-4E829WLEGG",
};

const fb = firebase.initializeApp(firebaseConfig);

const db = fb.firestore();

const auth = fb.auth();

export { db, auth };
