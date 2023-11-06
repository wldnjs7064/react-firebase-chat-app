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
import Crawling from "components/Crawling/Crawling";
import Recruit from "components/Recruit/Recruit";

function App(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.user.isLoading);
  const currentUser = useSelector((state) => state.user.currentUser);

  console.log("cur", currentUser);
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setUser(user));
        navigate("/mainpage");
      } else {
        dispatch(clearUser());
      }
    });
  }, [dispatch]);

  return (
    <Routes>
      <Route
        path="/mainpage"
        element={currentUser ? <MainPage /> : <LoginPage />}
      />
      <Route
        path="/chat"
        element={currentUser ? <ChatPage /> : <LoginPage />}
      />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/write"
        element={currentUser ? <BoardWrite /> : <LoginPage />}
      />
      <Route
        path="/board/:idx"
        element={currentUser ? <BoardDetail /> : <LoginPage />}
      />
      <Route
        path="/board/:idx/edit"
        element={currentUser ? <BoardEdit /> : <LoginPage />}
      />
      <Route
        path="/crawling"
        element={currentUser ? <Crawling /> : <LoginPage />}
      />
      <Route
        path="/recruit"
        element={currentUser ? <Recruit /> : <LoginPage />}
      />
    </Routes>
  );
}

export default App;
