import React from "react";
import styled from "styled-components";

function Board() {
  return (
    <Contents>
      <Content>안녕하세요</Content>
      <Content>안녕하세요</Content>
      <Content>안녕하세요</Content>
      <Content>안녕하세요</Content>
    </Contents>
  );
}

const Content = styled.div`
  width: 100%;
  height: 180px;
  background-color: white;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-bottom: solid;
  border-width: thin;
  border-color: #cccccc;

  /* 컨텐츠 아래 가운데만 얇게 border 처리하고싶어서 쓴 코드인데 잘 안됨. 수정예정 */
  &::after {
    content: "";
    width: 80px;
    height: 2px;
    background-color: rebeccapurple;
    position: absolute;
    left: 0;
    bottom: -25px;
  }
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  border: solid;
  border-width: thin;
  border-color: #cccccc;
  border-radius: 1px;
  width: 905px;
  height: 815px;
  margin-left: 620px;
`;
export default Board;
