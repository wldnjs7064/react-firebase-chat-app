import { useCallback, useEffect, useId, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "components/MainPage/Header/Header";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { boardDB } from "../../../../firebase";

const Page = () => {
  const navigate = useNavigate();
  const { register } = useForm();
  const editorRef = useRef();
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [DB, setDB] = useState([]);

  // 뒤로가기 버튼
  const handleGoBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  // 제목 입력
  const handleTitleChange = (e) => {
    e.preventDefault();
    setTitle(e.target.value);
  };

  // 작성하기 버튼을 누르면 editor의 내용을 content에 저장
  const onSubmit = async (e) => {
    e.preventDefault();
    const contentMark = editorRef.current?.getInstance().getMarkdown();
    console.log(contentMark);
    setContent(contentMark);
    createBoard();
  };

  // content가 바뀔 때마다 db에 저장
  const boardCollectionRef = getDocs(collection(boardDB, "board"));

  useEffect(() => {
    const getDB = async () => {
      const data = await boardCollectionRef;
      setDB(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getDB();
  }, [content]);

  const uniqueId = useId();
  console.log(uniqueId);

  const createBoard = async () => {
    // await setDoc(doc(DB, "board"), {
    //   title: title,
    //   content: content,
    // });
  };

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
                ref={editorRef}
                height="400px"
                placeholder="Please Enter Text."
                previewStyle="tab" // or vertical
                initialEditType="wysiwyg" // or markdow10n
                initialValue="이야기를 적어주세요 !"
                // hideModeSwitch={true} // 하단 숨기기
                toolbarItems={[
                  // 툴바 옵션 설정
                  ["heading", "bold", "italic", "strike"],
                  ["hr", "quote"],
                  ["ul", "ol", "task", "indent", "outdent"],
                  ["table", /* "image", */ "link"],
                  ["code", "codeblock"],
                ]}
                theme="dark"
                //useCommandShortcut={false} // 키보드 입력 컨트롤 방지 ex ctrl z 등
                usageStatistics={false} // 통계 수집 거부
              />
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
