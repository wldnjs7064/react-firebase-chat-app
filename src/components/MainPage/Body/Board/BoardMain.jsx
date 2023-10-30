import React, { useEffect, useState } from "react";
import styled from "styled-components";
import BoardList from "./BoardList";

function BoardMain() {
  return (
    <Contents>
      <BoardList />
    </Contents>
  );
}

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  border-top: solid;
  border-width: thin;
  border-color: #cccccc;
  height: 635px;
  background-color: white;
`;
export default BoardMain;
