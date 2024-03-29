import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../Header/Header';
import styled from 'styled-components';
import { deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { boardDB } from '../../../../firebase';
import CommentWrite from './Comment/CommentWrite';
import Comment from './Comment/Comment';
import MDEditor from '@uiw/react-md-editor';
import toast from 'react-hot-toast';
import '@toast-ui/editor/dist/toastui-editor.css';
import { set } from 'lodash';

function BoardDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.state.id;
  const data = location.state.data;
  const [newTitle, setNewTitle] = useState(data.title);
  const [newContent, setNewContent] = useState(data.content);
  const [newLike, setNewLike] = useState(data.like);

  const handleDelete = async () => {
    console.log('delete');
    await deleteDoc(doc(boardDB, 'Board', id));
    alert('삭제되었습니다.');
    navigate(-1);
  };

  const handleEdit = async () => {
    navigate(`edit`, {
      state: { id: id, data: data },
    });
  };

  const handleLike = async () => {
    const updatedLike = newLike + 1;
    setNewLike(updatedLike);
    try {
      await toast.promise(
        updateDoc(doc(boardDB, 'Board', id), {
          like: updatedLike,
        }),
        {
          loading: '좋아요를 누르는 중...',
          success: '좋아요를 눌렀습니다.',
          error: '좋아요를 누르는데 실패했습니다.',
        },
      );
      // 데이터베이스에서 문서 다시 가져오기
      const docSnapshot = await getDoc(doc(boardDB, 'Board', id));
      setNewLike(docSnapshot.data().like);
      console.log('Updated like count: ', docSnapshot.data().like);
    } catch (error) {
      console.error('Error updating document: ', error);
    }
  };

  useEffect(() => {
    async function getNewData() {
      const newData = await getDoc(doc(boardDB, 'Board', id));
      setNewTitle(newData.data().title);
      setNewContent(newData.data().content);
      setNewLike(newData.data().like);
    }
    getNewData();
  }, [id]);

  return (
    <div
      style={{
        height: '100vh',
        backgroundColor: '#fafafae1',
      }}
    >
      <Header />
      <UniBody>
        <UniContents>
          <UniTitle>{newTitle} </UniTitle>
          <ButtonWrapper>
            <StyledButton
              style={{
                width: 'fit-content',
                whiteSpace: 'nowrap',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'row',
                gap: '10px',
              }}
              onClick={handleLike}
            >
              좋아요
              <div
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  whiteSpace: 'nowrap',
                }}
              >
                <span>{newLike}</span>
              </div>
            </StyledButton>
            <StyledButton
              style={{
                width: 'fit-content',
                whiteSpace: 'nowrap',
                textAlign: 'center',
              }}
              onClick={handleEdit}
            >
              수정
            </StyledButton>
            <StyledButton
              style={{
                width: 'fit-content',
                whiteSpace: 'nowrap',
                textAlign: 'center',
              }}
              onClick={handleDelete}
            >
              삭제
            </StyledButton>
          </ButtonWrapper>
          <div
            className="markdownDiv"
            data-color-mode="light"
            style={{
              padding: 15,
              marginTop: 20,
              height: '100%',
              overflow: 'scroll',
            }}
          >
            <MDEditor.Markdown source={newContent} />
          </div>
        </UniContents>
        <div style={{ width: '905px', paddingTop: '25px' }}>
          <CommentWrite id={id} />
          <Comment id={id} />
        </div>
      </UniBody>
    </div>
  );
}

const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  flex-direction: row;
  gap: 10px;
  margin-top: 10px;
`;

const UniContents = styled.div`
  display: flex;
  flex-direction: column;
  width: 905px;
  height: 80%;
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
  height: 80vh;
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

const StyledButton = styled.button`
  width: 100px;
  height: 35px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: pretendard;
  color: black;
  border: none;
  border: 1px solid #e9ecef;
`;
export default BoardDetail;
