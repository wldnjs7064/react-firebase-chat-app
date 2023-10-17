import { boardDB } from '../../../../../firebase.js';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';

function Comment({id}) {
  const [comment, setComment] = useState('');
  const [isComment, setIsComment] = useState(false);
  const uid = id;

  const getComment = async () => {
    const commentRef = query(collection(boardDB, 'Comment'), orderBy('date'), where('id', '==', uid));
    const commentSnapshot = await getDocs(commentRef);
    console.log('commentSnapshot.docs', commentSnapshot.docs);
    if(commentSnapshot.docs.length === 0){
      setIsComment(false);
    }else{
      setIsComment(true);
      setComment(commentSnapshot.docs);
    }
  };
  useEffect(() => {
    getComment();
  }, []);

//댓글 등록 이후 댓글 목록을 다시 불러오는 함수 필요

  return (
    <div>
      {isComment && comment.map((comment) => (
        <div>{comment.data().comment}</div>
      ))}
    </div>
  );
}

export default Comment;
