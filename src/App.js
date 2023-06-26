import { Routes, Route, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import MainPage from "./components/MainPage/MainPage";
import LoginPage from "./components/LoginPage/LoginPage";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import ChatPage from "./components/ChatPage/ChatPage";
import firebase from "./firebase";

function App() {
  let navigate = useNavigate();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        //로그인 시에 메인페이지로 이동
        //console.log(user);
        navigate("/");
      } else {
        navigate("/login");
      }
    });
  }, []);

  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/chat" element={<ChatPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}

export default App;
