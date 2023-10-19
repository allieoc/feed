// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
//allows you to connect to db
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB4oIi9_oIuN8_vv8pvCYM84cUbLIS1-v0",
  authDomain: "feed-41f6f.firebaseapp.com",
  projectId: "feed-41f6f",
  storageBucket: "feed-41f6f.appspot.com",
  messagingSenderId: "593092853021",
  appId: "1:593092853021:web:632a59887a7d2317d335f4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//setup database and export it
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);