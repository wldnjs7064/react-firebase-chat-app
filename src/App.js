import { Routes, Route, useNavigate} from "react-router-dom";
import ChatPage from "./components/ChatPage/ChatPage";
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import { useEffect } from "react";
import firebase from './firebase';
function App() {
  let navigate = useNavigate();
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      console.log('user', user)
      //로그인이 된 상태
      if (user)
      {
        navigate("/");
      }
      else {
        navigate("/login");
      }
    })
  }, [])
  return (
      <Routes>
        <Route path="/" element={<ChatPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
  );
}

export default App;
