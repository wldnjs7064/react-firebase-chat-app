import { useDidMountEffect } from 'Hooks/useDidMountEffect.js';
import { boardDB } from '../../../../../firebase.js';
import { addDoc, collection } from 'firebase/firestore';
import React, { useState } from 'react';

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
    <div>
      <input type="text" onChange={handleComment} />
      <button type="button" onClick={createComment}>
        등록
      </button>
    </div>
  );
}

export default CommentWrite;
