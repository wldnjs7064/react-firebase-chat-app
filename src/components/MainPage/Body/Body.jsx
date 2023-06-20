import React from "react";
import { useNavigate } from "react-router-dom";
import { ForwardArrow, ProfileIcon } from "../../../assets";
import * as S from "../style";
import Board from "./Board/Board";
import styled from "styled-components";
import Input from "./BodyHeader/BodyHeader";
import BodyHeader from "./BodyHeader/BodyHeader";
function Body() {
  const navigate = useNavigate();
  const navigateLogin = () => {
    navigate("/login");
  };
  return (
    <S.Body>
      <Wrapper>
        <S.Login onClick={navigateLogin}>
          <ProfileIcon />
          로그인해주세요
          <ForwardArrow />
        </S.Login>
        <RightWrapper>
          <BodyHeader />
          <Board />
        </RightWrapper>
      </Wrapper>
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

export default Body;
