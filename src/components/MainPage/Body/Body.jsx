import React from "react";
import { useNavigate } from "react-router-dom";
import { ForwardArrow, ProfileIcon } from "../../../assets";
import * as S from "../style";
import Board from "./Board/Board";
function Body() {
  const navigate = useNavigate();
  const navigateLogin = () => {
    navigate("/login");
  };
  return (
    <S.Body>
      <S.Login onClick={navigateLogin}>
        <ProfileIcon />
        로그인해주세요
        <ForwardArrow />
      </S.Login>
      <Board />
    </S.Body>
  );
}

export default Body;
