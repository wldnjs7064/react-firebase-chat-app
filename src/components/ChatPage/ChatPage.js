import React from "react";
import SidePanel from "./SidePanel/SidePanel";
import MainPanel from "./MainPanel/MainPanel";
import Header from "components/MainPage/Header/Header"; //헤더 나중에 넣을거 생각

function ChatPage() {
  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: "300px" }}>
        <SidePanel />
      </div>
      <div style={{ width: "100%" }}>
        <MainPanel />
      </div>
    </div>
  );
}

export default ChatPage;
