import React from "react";
import { useNavigate } from "react-router-dom";
import { ForwardArrow, ProfileIcon } from "../../../assets";
import * as S from "../style";
import Board from "./Board/Board";
import Chat from "./Chat/Chat";
import styled from "styled-components";

function Body() {
  const navigate = useNavigate();
  const navigateLogin = () => {
    navigate("/login");
  };
  return (
    <S.Body>
      <WrapperLoginChat>
        <S.Login onClick={navigateLogin}>
          <ProfileIcon />
          로그인해주세요
          <ForwardArrow />
        </S.Login>
        <Chat />
      </WrapperLoginChat>
      <Board />
    </S.Body>
  );
}

const Wrapper = styled.div`
  width: fit-content;
  height: fit-content;
  display: flex;
  padding: 10px;
  align-content: center;
  gap: 15px;
`;
const WrapperLoginChat = styled.div`
  display: block;
`;

export default Body;
