import React, { useMemo } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../Header/Header";
import styled from "styled-components";
function UniBoard() {
  const location = useLocation();
  const data = location.state.data;
  console.log("unidata", data);

  return (
    <div>
      <Header />
      <UniBody>
        <h1>{data.title}</h1>
      </UniBody>
    </div>
  );
}
const UniTitle = styled.div``;

const UniBody = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  border: solid;
  border-width: thin;
  border-color: #cccccc;
  border-radius: 1px;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  justify-content: center;
  margin-top: 5%;
  align-items: center;
  -ms-overflow-style: none; /* 인터넷 익스플로러 */
  scrollbar-width: none; /* 파이어폭스 */
  ::-webkit-scrollbar {
    display: none; /* 크롬, 사파리, 오페라 브라우저 */
  }
`;

export default UniBoard;
