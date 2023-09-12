import React, { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../Header/Header";
import styled from "styled-components";
import { Firestore, deleteDoc, doc } from "firebase/firestore";
import { boardDB } from "../../../../firebase";

function UniBoard() {
  const navigate = useNavigate();

  const location = useLocation();
  const data = location.state.data;
  console.log("unidata", data);
  const handleDelelte = async () => {
    console.log("delete");
    await deleteDoc(doc(boardDB, "Board", "6EU2TEkeFKw6PnUYhqJM"));
    alert("삭제되었습니다.");
    navigate(-1);
  };
  return (
    <div
      style={{
        backgroundColor: "aliceblue",
        height: "100vh",
      }}
    >
      <Header />
      <UniBody>
        <UniContents>
          <UniTitle>{data.title}</UniTitle>
          <button onClick={handleDelelte}>게시물 삭제</button>
        </UniContents>
      </UniBody>
    </div>
  );
}

const UniContents = styled.div`
  display: flex;
  flex-direction: column;
  background-color: aliceblue;
  width: 905px;
  height: 100%;

  padding: 40px;
`;

const UniTitle = styled.div`
  font-size: 36px;
`;

const UniBody = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  height: 100%;
  width: 100%;
  margin: 0 auto;
  align-items: center;
  padding-top: 5%;
  -ms-overflow-style: none; /* 인터넷 익스플로러 */
  scrollbar-width: none; /* 파이어폭스 */
  ::-webkit-scrollbar {
    display: none; /* 크롬, 사파리, 오페라 브라우저 */
  }
`;

export default UniBoard;
