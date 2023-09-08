import { boardDB } from "../../../../firebase.js";
import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { collection, getDocs } from "firebase/firestore";

function BoardList() {
  const [DBData, setDBData] = useState([]);

  useEffect(() => {
    getContents();
  }, []);

  const getContents = async () => {
    const dbData = await getDocs(collection(boardDB, "Board"));
    console.log("docs", dbData.docs);
    setDBData(dbData.docs);
  };

  // console.log("DBData", DBData);

  return (
    // <Contents>
    <div style={{ backgroundColor: "#CCCCCC" }}>
      {DBData.map((doc) => (
        <Contents>
          <div key={doc.data().id}>
            <Title>{doc.data().title}</Title>
            <Content>{doc.data().content}</Content>
          </div>
        </Contents>
      ))}
    </div>
    // </Contents>
  );
}

const Title = styled.h3`
  font-size: 20px;
  font-weight: bold;
  margin: 0;
  background-color: antiquewhite;
`;

const Content = styled.p`
  font-size: 15px;
  margin: 0;
`;

const Contents = styled.div`
  width: 100%;
  height: 180px;
  background-color: aliceblue;
  /* text-align: center; */
  border-bottom: solid;
  border-width: thin;
  border-color: #cccccc;
  flex-direction: column;
  padding: 20px;

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
