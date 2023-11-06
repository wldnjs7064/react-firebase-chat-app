import { boardDB } from "../../../../firebase.js";
import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { write } from "redux/actions/write_action.js";

function BoardList() {
  const [DBData, setDBData] = useState([]);
  const [selectTag, setSelectTag] = useState("");
  const navigate = useNavigate();
  const selector = useSelector((state) => state.tag.selectedTag);
  const dispatch = useDispatch();

  useEffect(() => {
    setSelectTag("");
    Object.keys(selector).forEach((tagKey) => {
      const tag = selector[tagKey];
      if (tag.selected && tag.name !== selectTag) {
        setSelectTag(tag.name);
      }
    });
  }, [selector]);

  useEffect(() => {
    // Avoid infinite loop by checking if selectTag has changed
    getContents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectTag]);

  const getContents = async () => {
    if (selectTag === "") {
      const boardRef = query(
        collection(boardDB, "Board"),
        orderBy("date", "desc")
      );
      const boardSnapshot = await getDocs(boardRef);
      setDBData(boardSnapshot.docs);
    } else {
      const boardRef = query(
        collection(boardDB, "Board"),
        orderBy("date", "desc"),
        where("tag", "==", selectTag)
      );
      const boardSnapshot = await getDocs(boardRef);
      setDBData(boardSnapshot.docs);
    }
  };

  const navigateUniBoard = (id, data) => {
    dispatch(write({ id: id, data: data }));
    navigate(`/board/${id}`, {
      state: { id: id, data: data },
    });
  };

  return (
    <ContentList style={{ overflowY: "scroll", overflowX: "hidden" }}>
      {DBData.map((doc) => (
        <Contents
          key={doc.id}
          onClick={() => {
            navigateUniBoard(doc.id, doc.data());
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
  width: 905px;
  height: 100%;
  background-color: white;
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
  width: 925px;
  border-bottom: solid;
  border-width: thin;
  border-color: #cccccc;
  flex-direction: column;
  padding: 20px;

  ::-webkit-scrollbar {
    display: none; /* 크롬, 사파리, 오페라 브라우저 */
  }
  &::after {
    content: "";
    width: 80px;
    height: 2px;
    background-color: rebeccapurple;
    left: 0;
    bottom: -25px;
  }
`;
export default BoardList;
