import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Feed from "./Feed";

function Board() {
  const [feed, setFeed] = useState([]);
  // const [content, setContent] = useState(""); // 게시글 내용
  // const [title, setTitle] = useState(""); // 게시글 제목
  // const [name, setName] = useState(""); // 게시글 작성자
  // const [date, setDate] = useState(""); // 게시글 작성일

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
        <Feed
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
  border: solid;
  border-width: thin;
  border-color: #cccccc;
  border-radius: 1px;
  width: 905px;
  height: 815px;
  margin-left: 20px;
`;
export default Board;
