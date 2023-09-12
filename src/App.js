import {
  Routes,
  Route,
  useNavigate,
  BrowserRouter as Router,
} from "react-router-dom";
import React, { useEffect } from "react";
import "./App.css";
import MainPage from "./components/MainPage/MainPage";
import LoginPage from "./components/LoginPage/LoginPage";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import ChatPage from "./components/ChatPage/ChatPage";
import BoardWrite from "components/MainPage/Body/Board/BoardWrite";
import firebase from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import Page from "components/MainPage/Body/Board/BoardWrite";
import Write from "components/MainPage/Body/Board/BoardWrite";
import UniBoard from "components/MainPage/Body/Board/BoardDetail";
import { setUser, clearUser } from "./redux/actions/user_action";
import BoardUpdate from "components/MainPage/Body/Board/BoardEdit";
import BoardDetail from "components/MainPage/Body/Board/BoardDetail";
import BoardEdit from "components/MainPage/Body/Board/BoardEdit";

function App(props) {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  const isLoading = useSelector((state) => state.user.isLoading);

  // useEffect(() => {
  //   firebase.auth().onAuthStateChanged((user) => {
  //     if (user) {
  //       // 로그인 시에 채팅페이지로 이동
  //       navigate("/chat");
  //       dispatch(setUser(user));
  //     } else {
  //       navigate("/login");
  //       dispatch(clearUser());
  //     }
  //   });
  // }, []);

  // if (isLoading) {
  //   return <div>로딩중입니다.</div>;
  // } else {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/chat" element={<ChatPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/write" element={<BoardWrite />} />
      <Route path="/board/:idx" element={<BoardDetail />} />
      <Route path="/board/:idx/edit" element={<BoardEdit />} />
    </Routes>
  );
  // }
}

export default App;
