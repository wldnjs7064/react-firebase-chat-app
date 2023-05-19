import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import "firebase/compat/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyAE66f1cPMYx74zlkC30txOhndXa5vQrXs",
    authDomain: "react-firebase-chat-app-e96b2.firebaseapp.com",
    projectId: "react-firebase-chat-app-e96b2",
    storageBucket: "react-firebase-chat-app-e96b2.appspot.com",
    messagingSenderId: "169087505826",
    appId: "1:169087505826:web:cf61667813f0923c49cefb",
    measurementId: "G-F1Q89JMY3M"
  };

  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;