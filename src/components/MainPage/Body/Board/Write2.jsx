import ToastEditor from "components/ToastEditor";
import React from "react";
import styled from "styled-components";
import * as S from "../../style";
import Header from "components/MainPage/Header/Header";
function BoardWrite() {
  const register = () => {
    alert("등록되었습니다.");
  };
  return (
    <div>
      <Header style={{ backgroundColor: "fafafa" }} />
      <S.Body>
        <Wrapper>
          <RegisterButton onClick={register}>하이</RegisterButton>
          <ToastEditor />
        </Wrapper>
      </S.Body>
    </div>
  );
}

const RegisterButton = styled.button`
  overflow: hidden;
  background-color: gray;
  color: white;
  border: solid;
  min-width: 64px;
  height: 40px;
`;
const Wrapper = styled.div`
  width: fit-content;
  height: fit-content;
  padding: 10px;
  align-content: center;
  gap: 15px;
  background-color: #fafafa;
`;

export default BoardWrite;
