import React from "react";
import styled from "styled-components";

function Chat() {
  return <Chats>채팅방</Chats>;
}
const Chats = styled.div`
  border: solid;
  border-width: thin;
  border-color: #cccccc;
  position: relative;
  top: 48px;
  width: 258px;
  height: 667px;
  background-color: white;
  border-radius: 10px;
  font-family: "pretendard";
  font-size: 20px;
  text-align: center;
  font-weight: 400px;
`;
export default Chat;
