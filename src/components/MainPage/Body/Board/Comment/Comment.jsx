import { boardDB } from '../../../../../firebase.js';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';

function Comment({id}) {
  const [comment, setComment] = useState('');
  const [isComment, setIsComment] = useState(false);
  console.log('commentId', id);
  const getComment = async () => {
    const commentRef = query(collection(boardDB, 'Comment'), orderBy('date'));
    const commentSnapshot = await getDocs(commentRef);
    if(commentSnapshot.docs.length !== 0){ setIsComment(true);
    console.log('commentSnapshot.docs', commentSnapshot.docs);
    setComment(commentSnapshot.docs);
  }else {
    setIsComment(false);
  }
  };
  useEffect(() => {
    getComment();
  }, []);

//댓글 등록 이후 댓글 목록을 다시 불러오는 함수필요

  return (
    <div>
      {isComment && comment.map((comment) => (
        <div>{comment.data().comment}</div>
      ))}
    </div>
  );
}

export default Comment;
