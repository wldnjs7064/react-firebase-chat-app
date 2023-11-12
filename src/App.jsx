import { Routes, Route } from 'react-router-dom';
import MainPage from './components/MainPage/MainPage';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import ChatPage from './components/ChatPage/ChatPage';
import BoardWrite from 'components/MainPage/Body/Board/BoardWrite';
import BoardDetail from 'components/MainPage/Body/Board/BoardDetail';
import BoardEdit from 'components/MainPage/Body/Board/BoardEdit';
import Crawling from 'components/Crawling/Crawling';
import { Navigate } from 'react-router-dom';
import AuthzLayout from 'components/AuthzLayout';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from 'redux/actions/user_action';

function App() {
  const dispatch = useDispatch();
  const handleLoadUserData = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    dispatch(setUser(user));
  };

  useEffect(() => {
    handleLoadUserData();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Navigate replace to="/mainpage" />} />
      <Route path="/mainpage" element={<MainPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/write" element={<BoardWrite />} />
      <Route path="/board/:idx" element={<BoardDetail />} />
      <Route path="/board/:idx/edit" element={<BoardEdit />} />
      <Route path="/crawling" element={<Crawling />} />
      <Route element={<AuthzLayout />}>
        <Route path="/chat" element={<ChatPage />} />
      </Route>
    </Routes>
  );
}

export default App;
