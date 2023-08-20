import { boadDB } from "../../../../firebase.js";
import React, { useEffect } from "react";
import styled from "styled-components";
// import { getDocs } from "firebase/firestore";

function BoardList({ title, content }) {
  // eslint-disable-next-line react-hooks/exhaustive-deps

  // const boarddata = boadDB.collection("Board").doc("BoardContents");

  useEffect(() => {
    const getData = async () => {
      // const data = await getDocs(boarddata);
      // console.log(data);
    };

    getData();
  }, []);

  return (
    <Content>
      <Title>{title}</Title>
      <br />
      {/* <p>작성자 : {name}</p> */}
      {/* {date} */}
      {/* <br /> */}
      {content}
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
