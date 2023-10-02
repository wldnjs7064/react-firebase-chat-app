import { boardDB } from '../../../../../firebase.js';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';

function Comment() {
  const [comment, setComment] = useState('');

  const getComment = async () => {
    const commentRef = query(collection(boardDB, 'Comment'), orderBy('date'));
    const commentSnapshot = await getDocs(commentRef);

    console.log('commentSnapshot.docs', commentSnapshot.docs);
    setComment(commentSnapshot.docs);
  };
  useEffect(() => {
    getComment();
  }, []);

//댓글 등록 이후 댓글 목록을 다시 불러오는 함수필요

  return (
    <div>
      {comment.map((comment) => (
        <div>{comment.data().comment}</div>
      ))}
    </div>
  );
}

export default Comment;
