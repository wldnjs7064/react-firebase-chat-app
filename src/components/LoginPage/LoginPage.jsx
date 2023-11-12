import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  GoogleAuthProvider,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import Logo from '../../assets/svg/ColoredLogo.svg';
import { useNavigate } from 'react-router-dom';
import btnGoogle from '../../assets/btn_google.png';
import Google from '../../assets/Google.png';
import { setUser } from 'redux/actions/user_action';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';

function LoginPage() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const auth = getAuth();
  const currentUser = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleEmailLogin = async (data) => {
    const res = await signInWithEmailAndPassword(auth, data.email, data.password);
    dispatch(setUser(res.user));
    navigate('/mainpage');
    localStorage.setItem('user', JSON.stringify(res.user));
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    const res = await signInWithPopup(auth, provider);
    dispatch(setUser(res.user));
    navigate('/mainpage');
    localStorage.setItem('user', JSON.stringify(res.user));
  };

  const onSubmit = (data) => {
    toast.promise(handleEmailLogin(data), {
      loading: '로그인 중...',
      success: '로그인 성공',
      error: '이메일이나 비밀번호가 일치하지 않습니다.',
    });
  };

  useEffect(() => {
    console.log(currentUser);
    if (currentUser) {
      navigate(-1);
    }
  }, [currentUser]);

  return (
    <div className="auth-wrapper">
      <img src={Logo} alt="Logo" />
      <div id="id1">취업의 시작점, 취뽀스테이션</div>
      <div id="id2">
        취업, 이직, 커리어 콘텐츠까지
        <br />
        커리어 성장의 모든 것
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Email</label>
        <input
          name="email"
          type="email"
          {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
        />
        {errors.email && <p>This email field is required</p>}
        <label>Password</label>
        <input
          name="password"
          type="password"
          {...register('password', { required: true, minLength: 6 })}
        />
        {errors.password && errors.password.type === 'required' && (
          <p>This password field is required</p>
        )}
        {errors.password && errors.password.type === 'minLength' && (
          <p>Password must have at least 6 characters</p>
        )}
        <input type="submit" value="로그인하기" />
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '10px',
          }}
        >
          <span
            style={{
              marginRight: '10px',
              marginLeft: '10px',
              fontSize: '12px',
            }}
          >
            또는
          </span>
        </div>
        <img
          src={btnGoogle}
          alt="Google Login"
          style={{ display: 'block', margin: '0 auto', marginTop: '20px' }}
          onClick={handleGoogleLogin}
        />
        <img
          src={Google}
          alt="Google Login"
          style={{ display: 'block', margin: '0 auto', marginTop: '5px' }}
        />
        <div style={{ textAlign: 'center', marginTop: 70 }}>
          <a href="/register">아직 계정이 없으시나요? </a>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
