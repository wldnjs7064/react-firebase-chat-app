import React, { useEffect, useState } from "react";
import styled from "styled-components";
import BoardList from "./BoardList";

function BoardMain() {
  const [feed, setFeed] = useState([]);

  useEffect(() => {
    const contentHandler = (e) => {
      fetch("http://localhost:3000/data/mockdata.json", {
        method: "GET",
      })
        .then((res) => res.json())
        .then((res) => {
          setFeed(res);
        });
    };
    contentHandler();
  }, []);

  return (
    <Contents>
      {feed.map((item) => (
        <BoardList
          key={item.id}
          title={item.title}
          name={item.name}
          date={item.date}
          src={item.imgSrc}
          content={item.content}
        />
      ))}
    </Contents>
  );
}

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  border-top: solid;
  border-bottom: solid;
  border-width: thin;
  border-color: #cccccc;
  border-radius: 1px;
  width: 905px;
  height: 815px;
  margin-left: 20px;
`;
export default BoardMain;
