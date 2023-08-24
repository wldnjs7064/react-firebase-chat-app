import { boardDB } from "../../../../firebase.js";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { collection, getDocs } from "firebase/firestore";

function BoardList({ title, content }) {
  // eslint-disable-next-line react-hooks/exhaustive-deps

  // const boarddata = boardDB.collection("Board").doc("BoardContents");
  const [contents, setContents] = useState([]);

  const getContents = async () => {
    const dbData = await getDocs(collection(boardDB, "Board"));

    console.log("dbData.docs", dbData.docs[0].data());
    setContents(dbData.docs[0].data());
    // setContents(dbData.docs.map((doc) => doc.data()));
    // console.log("dbData", dbData);
    // dbData.forEach((doc) => {
    //   if (doc.exists) {
    //     // setContents(doc.data());
    //   }
    // });
  };

  useEffect(() => {
    getContents();
  }, []);

  return (
    <Content>
      <Title>{contents.title}</Title>
      <br />
      {/* <p>작성자 : {name}</p> */}
      {/* {date} */}
      {/* <br /> */}
      {contents.content}
    </Content>
  );
}

const Title = styled.h3`
  font-size: 20px;
  font-weight: bold;
  margin: 0;
`;

const Content = styled.div`
  width: 100%;
  height: 180px;
  background-color: white;
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
