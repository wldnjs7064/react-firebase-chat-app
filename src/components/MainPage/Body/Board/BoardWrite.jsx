import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "components/MainPage/Header/Header";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import { addDoc, collection } from "firebase/firestore";
import { boardDB } from "../../../../firebase";
import { useDidMountEffect } from "Hooks/useDidMountEffect";
import SelectTag from "./Filetering/WriteFilter";
import { useSelector } from "react-redux";

const BoardWrite = () => {
  const navigate = useNavigate();
  const { register } = useForm();
  const editorRef = useRef();
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const setTag = useSelector((state) => state.setTag.setTag);

  // 작성하기 버튼을 누르면 editor의 내용을 content에 저장
  const onSubmit = async (e) => {
    e.preventDefault();
    const contentMark = editorRef.current?.getInstance().getMarkdown();
    setContent(contentMark);
  };

  useDidMountEffect(() => {
    if (content === "") return;
    else {
      createBoard();
    }
  }, [content]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const createBoard = async () => {
    if (title === "") {
      alert("제목은 필수 입력사항입니다.");
    } else {
      try {
        await addDoc(collection(boardDB, "Board"), {
          title: title,
          content: content,
          id: uniqueId,
          date: new Date(),
          tag: setTag,
          like: 0,
        });
        alert("작성이 완료되었습니다.");
        navigate(-1);
      } catch (error) {
        alert(error);
      }
    }
  };

  const uniqueId = Math.random().toString(36).substr(2, 16);

  const handleGoBack = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
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
              name="title"
              placeholder="제목을 입력해주세요"
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
                ]}
                initialValue={" "}
                style={{ backgroundColor: "black" }}
                useCommandShortcut={false}
              />
            </div>
            <SelectTag />
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
};
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
  margin-right: 50px;
  font-family: pretendard;
`;

export default BoardWrite;
