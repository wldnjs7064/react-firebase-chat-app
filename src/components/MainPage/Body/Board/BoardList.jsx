import { boardDB } from "../../../../firebase.js";
import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function BoardList() {
  const [DBData, setDBData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getContents();
  }, []);

  const getContents = async () => {
    // const dbData = await getDocs(collection(boardDB, "Board"));
    // setDBData(dbData.docs);

    const boardRef = query(
      collection(boardDB, "Board"),
      orderBy("date", "desc")
    );
    const boardSnapshot = await getDocs(boardRef);

    console.log("boardSnapshot", boardSnapshot);
    setDBData(boardSnapshot.docs);
    console.log("dbData", DBData[0].id);
  };

  const navigateUniBoard = (data) => {
    navigate("/board/:id", {
      state: { data: data },
    });
  };

  return (
    <ContentList style={{ overflow: "scroll" }}>
      {DBData.map((doc) => (
        <Contents
          key={doc.data().id}
          onClick={() => {
            navigateUniBoard(doc.data());
          }}
        >
          <Title>{doc.data().title}</Title>
          <Content>{doc.data().content}</Content>
        </Contents>
      ))}
    </ContentList>
  );
}

const ContentList = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  border-bottom: solid;
  border-width: thin;
  border-color: #cccccc;
  border-radius: 1px;
  width: 905px;
  height: 100%;
  margin-left: 20px;
  overflow-y: scroll;
  overflow-x: hidden;
  -ms-overflow-style: none; /* 인터넷 익스플로러 */
  scrollbar-width: none; /* 파이어폭스 */
  ::-webkit-scrollbar {
    display: none; /* 크롬, 사파리, 오페라 브라우저 */
  }
`;

const Title = styled.h3`
  font-size: 20px;
  font-weight: bold;
`;

const Content = styled.p`
  font-size: 15px;
  width: 100%;
  height: 50px;
`;

const Contents = styled.div`
  /* width: 100%; */
  /* text-align: center; */
  border-bottom: solid;
  border-width: thin;
  border-color: #cccccc;
  flex-direction: column;
  padding: 20px;

  ::-webkit-scrollbar {
    display: none; /* 크롬, 사파리, 오페라 브라우저 */
  }
  /* 컨텐츠 아래 가운데만 얇게 border 처리하고싶어서 쓴 코드인데 잘 안됨. 수정예정 */
  &::after {
    content: "";
    width: 80px;
    height: 2px;
    background-color: rebeccapurple;
    /* position: absolute; */
    left: 0;
    bottom: -25px;
  }
`;
export default BoardList;
