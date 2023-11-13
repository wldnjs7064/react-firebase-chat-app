import { boardDB } from '../../../../../firebase.js';
import { addDoc, collection } from 'firebase/firestore';
import React, { useState } from 'react';
import styled from 'styled-components';

function CommentWrite({ id }) {
  const [comment, setComment] = useState('');

  const handleComment = async (e) => {
    e.preventDefault();
    console.log('e.target.value', e.target.value);
    setComment(e.target.value);
  };

  const createComment = async () => {
    if (comment === '') {
      alert('댓글을 입력해주세요.');
    } else {
      try {
        await addDoc(collection(boardDB, 'Comment'), {
          comment: comment,
          date: new Date(),
          id: id,
        });
        alert('댓글이 등록되었습니다.');
        setComment('');
        window.location.reload();
      } catch (error) {
        alert(error);
      }
    }
  };

  return (
    <InputWrapper>
      <StyledInput type="text" onChange={handleComment} />
      <StyledButton type="button" onClick={createComment}>
        등록
      </StyledButton>
    </InputWrapper>
  );
}
const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;
const StyledInput = styled.input`
  width: 100%;
  height: 40px;
  border: 1px solid #e9ecef;
  border-radius: 4px;
  padding: 0 10px;
  font-size: 14px;
  outline: none;
  box-sizing: border-box;
`;

const StyledButton = styled.button`
  width: 80px;
  height: 40px;
  border: 1px solid #e9ecef;
  border-radius: 4px;
  padding: 0 10px;
  font-size: 14px;
  outline: none;
  box-sizing: border-box;
`;
export default CommentWrite;
