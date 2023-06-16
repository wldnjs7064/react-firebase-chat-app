import React from "react";
import { useNavigate } from "react-router-dom";
import { ForwardArrow, ProfileIcon } from "../../../assets";
import * as S from "../style";
import Board from "./Board/Board";
<<<<<<< HEAD
import Chat from "./Chat/Chat";

=======
import styled from "styled-components";
>>>>>>> 341c922735b5091b7d91cf672c773366822627c7
function Body() {
  const navigate = useNavigate();
  const navigateLogin = () => {
    navigate("/login");
  };
  return (
    <S.Body>
<<<<<<< HEAD
      <S.Login onClick={navigateLogin}>
        <ProfileIcon />
        로그인해주세요
        <ForwardArrow />
      </S.Login>
      <Chat />
      <Board />
=======
      <Wrapper>
        <S.Login onClick={navigateLogin}>
          <ProfileIcon />
          로그인해주세요
          <ForwardArrow />
        </S.Login>
        <Board />
      </Wrapper>
>>>>>>> 341c922735b5091b7d91cf672c773366822627c7
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

export default Body;
