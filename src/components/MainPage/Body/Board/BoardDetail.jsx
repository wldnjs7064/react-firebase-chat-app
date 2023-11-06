import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../Header/Header";
import styled from "styled-components";
import {
  Firestore,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { boardDB } from "../../../../firebase";
import CommentWrite from "./Comment/CommentWrite";
import Comment from "./Comment/Comment";

function BoardDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.state.id;
  const data = location.state.data;
  const [newTitle, setNewTitle] = useState(data.title);
  const [newContent, setNewContent] = useState(data.content);
  const [newLike, setNewLike] = useState(data.like);

  const handleDelete = async () => {
    console.log("delete");
    await deleteDoc(doc(boardDB, "Board", id));
    alert("삭제되었습니다.");
    navigate(-1);
  };

  const handleEdit = async () => {
    navigate(`/board/${id}/edit`, {
      state: { id: id, data: data },
    });
  };

  const handleLike = async () => {
    setNewLike((prev) => prev + 1);
    alert("좋아요를 눌렀습니다.");

    // 데이터베이스 업데이트
    try {
      await updateDoc(doc(boardDB, "Board", id), {
        like: newLike + 1,
      });
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };
  useEffect(() => {
    async function getNewData() {
      const newData = await getDoc(doc(boardDB, "Board", id));
      console.log("newData views", newData.data().views);
      setNewTitle(newData.data().title);
      setNewContent(newData.data().content);
      setNewLike(newData.data().like);
    }
    getNewData();
  }, [data]);

  useEffect(() => {
    async function updateLike() {
      console.log("like", newLike);
      try {
        await updateDoc(doc(boardDB, "Board", id), {
          like: newLike,
        });
      } catch (error) {
        alert(error);
      }
    }
    if (newLike > 0) {
      updateLike();
    }
  }, [id, newLike]);

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
          <UniTitle>{newTitle}</UniTitle>
          <UniContent>{newContent}</UniContent>
          <ButtonWrapper>
            <button
              style={{
                marginTop: "400px",
                width: "fit-content",
                whiteSpace: "nowrap",
                textAlign: "center",
                display: "flex",
                flexDirection: "row",
                gap: "10px",
              }}
              onClick={handleLike}
            >
              좋아요
              <div
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span>{newLike}</span>
              </div>
            </button>
            <button
              style={{
                marginTop: "400px",
                width: "fit-content",
                whiteSpace: "nowrap",
                textAlign: "center",
              }}
              onClick={handleEdit}
            >
              수정
            </button>
            <button
              style={{
                marginTop: "400px",
                width: "fit-content",
                whiteSpace: "nowrap",
                textAlign: "center",
              }}
              onClick={handleDelete}
            >
              삭제
            </button>
          </ButtonWrapper>
          <CommentWrite id={id} />
          <Comment id={id} />
        </UniContents>
      </UniBody>
    </div>
  );
}

const ButtonWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  flex-direction: row;
  margin-top: 50px;
  gap: 10px;
`;

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
  overflow-x: hidden;
  -ms-overflow-style: none; /* 인터넷 익스플로러 */
  scrollbar-width: none; /* 파이어폭스 */
  ::-webkit-scrollbar {
    display: none; /* 크롬, 사파리, 오페라 브라우저 */
  }
`;

export default BoardDetail;
