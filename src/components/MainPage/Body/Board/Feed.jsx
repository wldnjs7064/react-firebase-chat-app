import React from "react";
import styled from "styled-components";

function Feed({ title, name, date, content }) {
  return (
    <Content>
      {title}
      <br />
      <p>작성자 : {name}</p>
      {date}
      <br />

      {content}
    </Content>
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
  flex-direction: column;

  /* 컨텐츠 아래 가운데만 얇게 border 처리하고싶어서 쓴 코드인데 잘 안됨. 수정예정 */
  &::after {
    content: "";
    width: 80px;
    height: 2px;
    background-color: rebeccapurple;
    /* position: absolute; */
    left: 0;
    bottom: -25px;
  }
`;
export default Feed;
