import React from "react";
import { useRef } from "react";
import { set, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "components/MainPage/Header/Header";
import { Editor } from "@toast-ui/react-editor";
import { doc, updateDoc } from "firebase/firestore";
import { boardDB } from "../../../../firebase";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import "@toast-ui/editor/dist/toastui-editor.css";

function BoardEdit() {
  const { register, getValues, setValue } = useForm();
  const editorRef = useRef();

  const navigate = useNavigate();
  const location = useLocation();
  const docId = location.state.id;
  const data = location.state.data;

  // 작성하기 버튼을 누르면 editor의 내용을 content에 저장
  const onSubmit = async (e) => {
    const { title } = getValues();
    e.preventDefault();
    const contentMark = editorRef.current?.getInstance().getMarkdown();
    if (!title) alert("제목은 필수 입력사항입니다.");
    try {
      await toast.promise(
        updateDoc(doc(boardDB, "Board", docId), {
          title: title,
          content: contentMark,
        }),
        {
          loading: "수정중...",
          success: "수정이 완료되었습니다.",
          error: "수정에 실패했습니다.",
        }
      );
      navigate(-1);
    } catch (error) {
      alert(error);
    }
  };

  // 뒤로가기 버튼
  const handleGoBack = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  // 제목 입력
  const handleTitleChange = (e) => {
    e.preventDefault();
    setValue("title", e.target.value);
  };

  return (
    <div style={{ height: "100vh", backgroundColor: "#fafafae1" }}>
      <Header />
      <Body>
        <TitleEditorWrapper>
          <TitleWrapper>
            <TitleInput
              {...register("title", {
                required: "제목은 필수 입력 사항입니다.",
              })}
              type="text"
              id="title"
              defaultValue={data.title}
              onChange={handleTitleChange}
            />
          </TitleWrapper>
          <EditorTagWrapper>
            <div
              style={{
                height: "450px",
                width: "1185px",
                backgroundColor: " white",
              }}
            >
              <Editor
                ref={editorRef}
                placeholder="내용을 입력해주세요."
                previewStyle="vertical" // 미리보기 스타일 지정
                height="450px" // 에디터 창 높이
                toolbarItems={[
                  // 툴바 옵션 설정
                  ["heading", "bold", "italic", "strike"],
                  ["hr", "quote"],
                  ["ul", "ol", "task", "indent", "outdent"],
                  ["table", "image", "link"],
                  ["code", "codeblock"],
                  ["heading", "bold", "italic", "strike"],
                  ["hr", "quote"],
                  ["ul", "ol", "task", "indent", "outdent"],
                  ["table", "image", "link"],
                  ["code", "codeblock"],
                ]}
                style={{ backgroundColor: "black" }}
                useCommandShortcut={false}
                initialValue={data.content}
              />
            </div>
            <Buttons>
              <Button type="button" onClick={handleGoBack}>
                뒤로가기
              </Button>
              <Button type="submit" onClick={onSubmit}>
                작성하기
              </Button>
            </Buttons>
          </EditorTagWrapper>
        </TitleEditorWrapper>
      </Body>
    </div>
  );
}

const Body = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const TitleEditorWrapper = styled.div`
  width: 1185px;
  display: flex;
  flex-direction: column;
`;
const EditorTagWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const TitleWrapper = styled.div`
  padding: 100px 0 30px 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
`;
const TitleInput = styled.input`
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 1185px;
`;
const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
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
