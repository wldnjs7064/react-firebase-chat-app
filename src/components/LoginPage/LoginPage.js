import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Logo from "../../assets/svg/ColoredLogo.svg";
import { useNavigate } from "react-router-dom";
import btnGoogle from "../../assets/btn_google.png";
import Google from "../../assets/Google.png";

function LoginPage() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const auth = getAuth();
  const [errorFromSubmit, setErrorFromSubmit] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, data.email, data.password);
      alert("로그인이 완료되었습니다.");
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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "10px",
          }}
        >
          <span
            style={{
              marginRight: "10px",
              marginLeft: "10px",
              fontSize: "12px",
            }}
          >
            또는
          </span>
        </div>
        <img
          src={btnGoogle}
          alt="Google Login"
          style={{ display: "block", margin: "0 auto", marginTop: "20px" }}
        />
        <img
          src={Google}
          alt="Google Login"
          style={{ display: "block", margin: "0 auto", marginTop: "5px" }}
        />
        <div style={{ textAlign: "center", marginTop: 70 }}>
          <a href="/register">아직 계정이 없으시나요? </a>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
