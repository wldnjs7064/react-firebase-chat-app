import React from "react";
import { ColoredLogo, ForwardArrow, ProfileIcon } from "../../assets";
import { Navigate } from "react-router-dom";
import * as S from "./style";
function MainPage() {
  const handleClick = () => {
    alert("로그인 페이지로 이동합니다.");
    Navigate("/login");
  };

  return (
    <div style={{ backgroundColor: "#fafafae1" }}>
      <S.Wrapper>
        {/* <Header> */}
        <S.Icon>
          <ColoredLogo style={{ filter: "drop-shadow" }} />
        </S.Icon>
        <S.Categories>
          <S.Category>커뮤니티</S.Category>
          <S.Category>멘토멘티</S.Category>
        </S.Categories>
        <S.SigninButton onClick={handleClick}>로그인 | 회원가입</S.SigninButton>
        {/* </Header> */}
      </S.Wrapper>
      <S.Body>
        <S.Login>
          <ProfileIcon />
          로그인해주세요
          <ForwardArrow />
        </S.Login>
        <S.Board />
      </S.Body>
    </div>
  );
}

export default MainPage;
