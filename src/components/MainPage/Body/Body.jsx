import React from "react";
import { useNavigate } from "react-router-dom";
import { ForwardArrow, ProfileIcon } from "../../../assets";
import * as S from "../style";
import Chat from "./Chat/Chat";
import styled from "styled-components";
import BodyHeader from "./BodyHeader/BodyHeader";
import BoardMain from "./Board/Main";
import BoardList from "./Board/List";

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
      <BoardList />
    </S.Body>
  );
}

const RightWrapper = styled.div`
  background-color: white;
  border: solid;
  border-width: thin;
  border-color: #cccccc;
  padding: 0 10px;
`;
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
