import { PencilIcon, QuestionProfileIcon } from "assets";
import React, { useState } from "react";
import styled from "styled-components";
import Filtering from "./HeaderFilter/HeaderFilter";
import { useNavigate } from "react-router-dom";

function BodyHeader() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/write");
  };
  return (
    <>
      <Tags>
        <Filtering />
      </Tags>
      <Form>
        <Profile>
          <QuestionProfileIcon />
        </Profile>
        <Question onClick={handleClick} type="text">
          커리어와 라이프스타일에 대해 자유롭게 이야기 해보세요 !
          <Icon>
            <PencilIcon />
          </Icon>
        </Question>
      </Form>
    </>
  );
}

const Tags = styled.div``;
const Icon = styled.div``;
const Profile = styled.div`
  margin-left: 20px;
`;

const Form = styled.form`
  border-top: solid;
  border-width: thin;
  padding: 10px 5px 0px 5px;
  border-color: #cccccc;
  width: 905px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;
const Question = styled.button`
  width: 85%;
  height: 45px;
  border-radius: 10px;
  border: solid;
  border-width: thin;
  border-color: #cccccc;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-right: 50px;
  padding: 0 20px;
  background-color: white;
  color: #404040;
`;
// const Button = styled.button`
//   border-radius: 10px;
//   height: 45px;
//   &:hover {
//     cursor: pointer;
//     background-color: aliceblue;
//   }
//   background-color: white;
//   border-color: gray;
// `;

export default BodyHeader;
