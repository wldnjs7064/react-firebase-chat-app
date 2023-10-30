import React from "react";
import { ColoredLogo } from "../../../assets";
import { useNavigate } from "react-router-dom";
import * as S from "../style";

function Header() {
  const navigate = useNavigate();
  const navigateHome = () => {
    navigate("/");
  };
  const navigateLogin = () => {
    navigate("/login");
  };
  const navigateRecruit = () => {
    navigate("/recruit");
  };
  return (
    <S.Wrapper>
      {/* <Header> */}
      <S.Icon onClick={navigateHome}>
        <ColoredLogo style={{ filter: "drop-shadow" }} />
      </S.Icon>
      <S.Categories>
        <S.Category>커뮤니티</S.Category>
        <S.Category onClick={navigateRecruit}>모집공고</S.Category>
      </S.Categories>
      <S.SigninButton onClick={navigateLogin}>로그인 | 회원가입</S.SigninButton>
      {/* </Header> */}
    </S.Wrapper>
  );
}

export default Header;
