import React from "react";
import { IoIosChatboxes } from "react-icons/io";
import Dropdown from "react-bootstrap/Dropdown";
import Image from "react-bootstrap/Image";
// import { useSelector } from "react-redux";

function UserPanel() {
  // const user = useSelector(state => state.user.currentUser)
  return (
    <div>
      <h3 style={{ color: "white" }}>
        <IoIosChatboxes /> 채팅방
      </h3>
      <div style={{ display: "flex", marginBottom: "1rem" }}>
        <Image
          src="holder.js/171x180"
          style={{ width: "30p", height: "30px", marginTop: "3px" }}
          roundedCircle
        />
        <Dropdown>
          <Dropdown.Toggle
            style={{ background: "transparent", border: "0px" }}
            id="dropdown-basic"
          >
            user name
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">프로필 사진 변경</Dropdown.Item>
            <Dropdown.Item href="#/action-2">로그아웃</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
}

export default UserPanel;
