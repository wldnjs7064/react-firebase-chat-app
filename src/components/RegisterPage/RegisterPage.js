import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import firebase from "../../firebase";
import md5 from "md5";
import Logo from "../../assets/svg/ColoredLogo.svg";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [errorFromSubmit, setErrorFromSubmit] = useState("");

  const [loading, setLoading] = useState(false);

  const password = useRef();
  password.current = watch("password");

  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      let createdUser = await firebase
        .auth()
        .createUserWithEmailAndPassword(data.email, data.password);

      await createdUser.user.updateProfile({
        displayName: data.name,
        photoURL: `http://gravatar.com/avatar/${md5(
          createdUser.user.email
        )}?d=identicon`,
      });

      console.log("name : " + createdUser.user.displayName);
      console.log("PhotoURL : " + createdUser.user.photoURL);
      //firebase DB에 저장해주기
      await firebase
        .database()
        .ref("users")
        .child(createdUser.user.uid)
        .set({});
      alert("회원가입이 완료되었습니다.");
      navigate("/login");
      setLoading(false);
    } catch (error) {
      setErrorFromSubmit(error.message);
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
        취업, 이직, 커리어 콘텐츠까지 <br />
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
        <label>Name</label>
        <input
          name="name"
          {...register("name", { required: true, maxLength: 10 })}
        />
        {errors.name && errors.name.type === "required" && (
          <p>This name field is required</p>
        )}
        {errors.name && errors.name.type === "maxLength" && (
          <p>Your input exceed maximum length</p>
        )}
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
        <label>Password Confirm</label>
        <input
          name="password_confirm"
          type="password"
          {...register("password_confirm", {
            required: true,
            validate: (value) => value === password.current,
          })}
        />
        {errors.password_confirm &&
          errors.password_confirm.type === "required" && (
            <p>This password confirm field is required</p>
          )}
        {errors.password_confirm &&
          errors.password_confirm.type === "validate" && (
            <p>The passwords do not match </p>
          )}

        {errorFromSubmit && <p>{errorFromSubmit}</p>}
        <input type="submit" value="이메일로 계속하기" disabled={loading} />
        <div style={{ textAlign: "center", marginTop: 70 }}>
          <a href="../login">이미 계정이 있으시나요? </a>
        </div>
      </form>
    </div>
  );
}

export default RegisterPage;
