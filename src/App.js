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
import BoardWrite from "components/MainPage/Body/Board/Write2";
import firebase from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./redux/actions/user_action";
import Page from "components/MainPage/Body/Board/Write";
import Write from "components/MainPage/Body/Board/Write";

function App(props) {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  const isLoading = useSelector((state) => state.user.isLoading);

  useEffect(() => {
    // firebase.auth().onAuthStateChanged((user) => {
    //   if (user) {
    //     //로그인 시에 메인페이지로 이동
    //     //console.log(user);
    //     navigate("/");
    //     dispatch(setUser(user));
    //   } else {
    //     navigate("/login");
    //   }
    // });
  }, []);

  // if (isLoading) {
  //   return <div>로딩중입니다.</div>;
  // } else {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/chat" element={<ChatPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      {/* <Route path="/write" element={<BoardWrite />} /> */}
      <Route path="/write" element={<Write />} />
    </Routes>
  );
}
// }

export default App;
