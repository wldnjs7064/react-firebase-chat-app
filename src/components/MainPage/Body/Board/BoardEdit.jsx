import React from 'react';
import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { set, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from 'components/MainPage/Header/Header';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { boardDB } from '../../../../firebase';
import { useDidMountEffect } from 'Hooks/useDidMountEffect';
import { useLocation } from 'react-router-dom';

function BoardEdit() {
  const navigate = useNavigate();
  const { register } = useForm();
  const editorRef = useRef();
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');

  const location = useLocation();
  const docId = location.state.id;
  const data = location.state.data;

  // 작성하기 버튼을 누르면 editor의 내용을 content에 저장
  const onSubmit = async (e) => {
    e.preventDefault();
    const contentMark = editorRef.current?.getInstance().getMarkdown();
    setContent(contentMark);
  };

  useDidMountEffect(() => {
    if (content === '') return;
    else {
      handleEdit();
    }
  }, [content]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleEdit = async () => {
    if (title === '') {
      alert('제목은 필수 입력사항입니다.');
    } else {
      try {
        // boardDB.collection("Board").doc(docId).update({
        //   title: title,
        //   content: content,
        //   id: uniqueId,
        //   date: new Date(),
        // });

        await updateDoc(doc(boardDB, 'Board', docId), {
          title: title,
          content: content,
        });
        alert('수정이 완료되었습니다.');
        navigate(-1);
      } catch (error) {
        alert(error);
      }
    }
  };

  const uniqueId = Math.random().toString(36).substr(2, 16);

  // 뒤로가기 버튼
  const handleGoBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  // 제목 입력
  const handleTitleChange = (e) => {
    e.preventDefault();
    setTitle(e.target.value);
  };

  return (
    <div>
      <Header />
      <div>
        <form>
          {' '}
          <TitleWrapper>
            <p
              style={{
                fontFamily: 'pretendard',
                fontSize: '25px',
              }}
            ></p>
            <TitleInput
              {...register('title', {
                required: '제목은 필수 입력 사항입니다.',
              })}
              type="text"
              id="title"
              name="title"
              defaultValue={data.title}
              onChange={handleTitleChange}
            />
          </TitleWrapper>
          <>
            <div style={{ padding: '0px 100px' }}>
              <Editor
                ref={editorRef}
                placeholder="내용을 입력해주세요."
                initialValue={data.content}
                previewStyle="vertical" // 미리보기 스타일 지정
                height="300px" // 에디터 창 높이
                initialEditType="wysiwyg" // 초기 입력모드 설정(디폴트 markdown)
                toolbarItems={[
                  // 툴바 옵션 설정
                  ['heading', 'bold', 'italic', 'strike'],
                  ['hr', 'quote'],
                  ['ul', 'ol', 'task', 'indent', 'outdent'],
                  ['table', 'image', 'link'],
                  ['code', 'codeblock'],
                ]}
                useCommandShortcut={false}
              ></Editor>
            </div>
          </>
          <Buttons>
            <Button onClick={handleGoBack}>뒤로가기</Button>
            <Button type="submit" onClick={onSubmit}>
              수정하기
            </Button>
          </Buttons>
        </form>
      </div>
    </div>
  );
}

const TitleWrapper = styled.div`
  padding: 50px 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
`;
const TitleInput = styled.input`
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 85%;
`;
const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  padding: 0 100px;
`;
const Button = styled.button`
  width: 100px;
  height: 50px;
  border-radius: 10px;
  border: solid;
  border-width: thin;
  border-color: #cccccc;
  display: flex;
  align-items: center;
  justify-content: center;
  /* justify-content: space-between; */
  margin-right: 50px;
  font-family: pretendard;
`;

export default BoardEdit;
