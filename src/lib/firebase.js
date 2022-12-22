import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_KEY,
  authDomain: "newjubora.firebaseapp.com",
  projectId: "newjubora",
  storageBucket: "newjubora.appspot.com",
  messagingSenderId: "675327801965",
  appId: "1:675327801965:web:59a8cf74d74463675d5d64",
  measurementId: "G-LM5EZ8B5SY",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
