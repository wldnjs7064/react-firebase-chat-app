import { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "components/MainPage/Header/Header";
import { useDispatch, useSelector } from "react-redux";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import { writeAction } from "redux/reducers/write_reducer";
const Page = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const 제목 = useSelector((state) => state.write.title);
  const 내용 = useSelector((state) => state.write.content);
  const editorRef = useRef();

  const {
    register,
    // handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  const ref = useRef();

  const handleGoBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const handleTitleChange = (e) => {
    e.preventDefault();
    setTitle(e.target.value);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const contentMark = editorRef.current?.getInstance().getMarkdown();
    setContent(contentMark);
    dispatch(writeAction(title, content));
  };

  useEffect(() => {
    console.log(제목, 내용);
  }, [제목, 내용]);

  return (
    <div>
      <Header />
      <div>
        <form onSubmit={onSubmit}>
          <TitleWrapper>
            <p
              style={{
                fontFamily: "pretendard",
                fontSize: "25px",
              }}
            >
              제목
            </p>
            <p>{제목}</p>
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
          <>
            <div style={{ padding: "0px 100px" }}>
              <Editor
                value={content} // DOM 선택용 useRef
                onChange={(e) => console.log(e)}
                placeholder="내용aaa을 입력해주세요."
                previewStyle="vertical" // 미리보기 스타일 지정
                height="500px" // 에디터 창 높이
                initialEditType="wysiwyg" //
                toolbarItems={[
                  // 툴바 옵션 설정
                  ["heading", "bold", "italic", "strike"],
                  ["hr", "quote"],
                  ["ul", "ol", "task", "indent", "outdent"],
                  ["table", "image", "link"],
                  ["code", "codeblock"],
                ]}
                useCommandShortcut={false} // 키보드 입력 컨트롤 방지
              ></Editor>
              <p style={{ color: "black" }}>{내용}</p>
              <button onClick={onSubmit}>등록</button>
            </div>
          </>
          {/* <NoSsrEditor content="" /> */}
          <Buttons>
            <Button onClick={handleGoBack}>뒤로가기</Button>
            <Button type="submit">작성하기</Button>
          </Buttons>
        </form>
      </div>
    </div>
  );
};

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

export default Page;
