import React, { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../Header/Header";
import styled from "styled-components";
import { Firestore, deleteDoc, doc } from "firebase/firestore";
import { boardDB } from "../../../../firebase";

function UniBoard() {
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.state.id;
  const data = location.state.data;

  const handleDelelte = async () => {
    console.log("delete");
    await deleteDoc(doc(boardDB, "Board", id));
    alert("삭제되었습니다.");
    navigate(-1);
  };

  return (
    <div
      style={{
        height: "100vh",
        backgroundColor: "#fafafae1",
      }}
    >
      <Header />
      <UniBody>
        <UniContents>
          <UniTitle>{data.title}</UniTitle>
          <UniContent>{data.content}</UniContent>
          <button
            style={{
              alignSelf: "flex-end",
              marginTop: "500px",
              width: "fit-content",
              whiteSpace: "nowrap",
              textAlign: "center",
            }}
            onClick={handleDelelte}
          >
            삭제
          </button>
        </UniContents>
      </UniBody>
    </div>
  );
}

const UniContent = styled.div`
  font-size: 18px;
  margin-top: 20px;
`;

const UniContents = styled.div`
  display: flex;
  flex-direction: column;
  width: 905px;
  height: 100%;
  background-color: white;
  border-radius: 2%;
  border: solid;
  border-width: thin;
  border-color: #cccccc;
  padding: 40px;
`;

const UniTitle = styled.div`
  font-size: 36px;
  border-bottom: solid;
  border-width: thin;
  border-color: #cccccc;
  font-weight: 600;
`;

const UniBody = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 50px;
  background-color: #fafafae1;
  height: 80%;
  width: 100%;
  margin: 0 auto;
  align-items: center;
  -ms-overflow-style: none; /* 인터넷 익스플로러 */
  scrollbar-width: none; /* 파이어폭스 */
  ::-webkit-scrollbar {
    display: none; /* 크롬, 사파리, 오페라 브라우저 */
  }
`;

export default UniBoard;
