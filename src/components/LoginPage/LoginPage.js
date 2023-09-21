import React, { useState } from "react";
import { useForm } from "react-hook-form";
import firebase from "../../firebase";
import Logo from "../../assets/svg/ColoredLogo.svg";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [errorFromSubmit, setErrorFromSubmit] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      setLoading(true);

      await firebase
        .auth()
        .signInWithEmailAndPassword(data.email, data.password);
      alert("로그인이 완료되었습니다.");
      navigate("/chat");
      setLoading(false);
    } catch (error) {
      setErrorFromSubmit(error.message);
      alert("이메일 또는 비밀번호가 틀렸습니다.");
      setLoading(false);
      setTimeout(() => {
        setErrorFromSubmit("");
      }, 5000);
    }
  };

  return (
    <div className="auth-wrapper">
      <img src={Logo} />
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
          {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
        />
        {errors.email && <p>This email field is required</p>}
        <label>Password</label>
        <input
          name="password"
          type="password"
          {...register("password", { required: true, minLength: 6 })}
        />
        {errors.password && errors.password.type === "required" && (
          <p>This password field is required</p>
        )}
        {errors.password && errors.password.type === "minLength" && (
          <p>Password must have at least 6 characters</p>
        )}
        <input type="submit" value="로그인하기" disabled={loading} />
        <div style={{ textAlign: "center", marginTop: 70 }}>
          <a href="/register">아직 계정이 없으시나요? </a>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
