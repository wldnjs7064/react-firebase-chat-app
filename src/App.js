import { Routes, Route, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import "./App.css";
import MainPage from "./components/MainPage/MainPage";
import LoginPage from "./components/LoginPage/LoginPage";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import ChatPage from "./components/ChatPage/ChatPage";
import BoardWrite from "components/MainPage/Body/Board/BoardWrite";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { setUser, clearUser } from "./redux/actions/user_action";
import BoardDetail from "components/MainPage/Body/Board/BoardDetail";
import BoardEdit from "components/MainPage/Body/Board/BoardEdit";
import Recruit from "./components/MainPage/Body/recruit/recruit";
function App(props) {
  const navigate = useNavigate();
  let dispatch = useDispatch();
  const isLoading = useSelector((state) => state.user.isLoading);

  // useEffect(() => {
  //   const auth = getAuth();
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       // 로그인 시에 채팅페이지로 이동
  //       navigate("/chat");
  //       dispatch(setUser(user));
  //     } else {
  //       // 로그인되지 않은 경우 "/login" 페이지로 이동
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
      <Route path="/recruit" element={<Recruit />} />
      <Route path="/board/:idx" element={<BoardDetail />} />
      <Route path="/board/:idx/edit" element={<BoardEdit />} />
    </Routes>
  );
}
// }

export default App;
