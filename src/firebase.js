// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCLJYPBDeK3JjSUomS1DeUiXrm65zfiOrA",
  authDomain: "apiacere.firebaseapp.com",
  projectId: "apiacere",
  storageBucket: "apiacere.appspot.com",
  messagingSenderId: "16385878100",
  appId: "1:16385878100:web:6dd04a3352d5be8557e5c1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);