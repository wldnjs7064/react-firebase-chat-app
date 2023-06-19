import React from "react";
import UserPanel from "./UserPanel";
import Favorited from "./Favorited";
import ChatRooms from "./ChatRooms";
import DirectMessages from "./DirectMessages";
import Chat from "components/MainPage/Body/Chat/Chat";

function SidePanel() {
  return (
    <div
      style={{
        backgroundColor: "#2C5AF1",
        padding: "2rem",
        minHeight: "100vh",
        color: "white",
        minWidth: "275px",
      }}
    >
      <UserPanel />

      <Favorited />

      <ChatRooms />

      <DirectMessages />
    </div>
  );
}

export default SidePanel;
