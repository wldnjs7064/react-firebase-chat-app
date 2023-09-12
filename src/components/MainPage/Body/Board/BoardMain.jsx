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
  background-color: white;
  border-top: solid;
  border-bottom: solid;
  border-width: thin;
  border-color: #cccccc;
  border-radius: 1px;
  width: 905px;
  height: 635px;
  margin-left: 20px;
  overflow: scroll;
`;
export default BoardMain;
