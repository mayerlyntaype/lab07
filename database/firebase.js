// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB3K8BHOZv63Qtm66oLy783lKaZVH0Tqn8",
  authDomain: "lab07-4703b.firebaseapp.com",
  projectId: "lab07-4703b",
  storageBucket: "lab07-4703b.appspot.com",
  messagingSenderId: "783996524164",
  appId: "1:783996524164:web:1522e6dc797c2a804a54d1",
  measurementId: "G-QHPWT3MEE1"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const database = getFirestore()
