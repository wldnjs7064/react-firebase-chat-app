import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import "firebase/compat/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAE66f1cPMYx74zlkC30txOhndXa5vQrXs",
    authDomain: "react-firebase-chat-app-e96b2.firebaseapp.com",
    databaseURL: "https://react-firebase-chat-app-e96b2-default-rtdb.firebaseio.com",
    projectId: "react-firebase-chat-app-e96b2",
    storageBucket: "react-firebase-chat-app-e96b2.appspot.com",
    messagingSenderId: "169087505826",
    appId: "1:169087505826:web:e85943c0fd9682d349cefb",
    measurementId: "G-QJKK6NZ2ZS"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;