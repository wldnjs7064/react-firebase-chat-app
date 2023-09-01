import React, { useRef } from "react";
import { IoIosChatboxes } from "react-icons/io";
import Dropdown from "react-bootstrap/Dropdown";
import Image from "react-bootstrap/Image";
import { useSelector } from "react-redux";
import firebase from "../../../firebase";

function UserPanel() {
  const user = useSelector((state) => state.user.currentUser);
  const inputOpenImageRef = useRef();
  const handleLogout = () => {
    firebase.auth().signOut();
  };
  const handleOpenImageRef = () => {
    inputOpenImageRef.current.click();
  };
  return (
    <div>
      <h3 style={{ color: "white" }}>
        <IoIosChatboxes /> 채팅방
      </h3>
      <div style={{ display: "flex", marginBottom: "1rem" }}>
        <Image
          src={user && user.photoURL}
          style={{ width: "30p", height: "30px", marginTop: "3px" }}
          roundedCircle
        />
        <Dropdown>
          <Dropdown.Toggle
            style={{ background: "transparent", border: "0px" }}
            id="dropdown-basic"
          >
            {user && user.displayName}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={handleOpenImageRef}>
              프로필 사진 변경
            </Dropdown.Item>
            <Dropdown.Item onClick={handleLogout}>로그아웃</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <input
        accept="image/jpeg, image/png"
        style={{ display: "none" }}
        ref={inputOpenImageRef}
        type="file"
      />
    </div>
  );
}

export default UserPanel;
