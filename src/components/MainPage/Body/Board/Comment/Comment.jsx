import { boardDB } from '../../../../../firebase.js';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';

function Comment({ id }) {
  const [comment, setComment] = useState('');
  const [isComment, setIsComment] = useState(false);
  const uid = id;

  const getComment = async () => {
    const commentRef = query(
      collection(boardDB, 'Comment'),
      orderBy('date'),
      where('id', '==', uid),
    );
    const commentSnapshot = await getDocs(commentRef);
    if (commentSnapshot.docs.length === 0) {
      setIsComment(false);
    } else {
      setIsComment(true);
      setComment(commentSnapshot.docs);
    }
  };
  useEffect(() => {
    getComment();
  }, []);

  return (
    <div>
      {isComment &&
        comment.map((comment, i) => (
          <div key={i} style={{ marginLeft: '10px' }}>
            {comment.data().comment}
          </div>
        ))}
    </div>
  );
}

export default Comment;
