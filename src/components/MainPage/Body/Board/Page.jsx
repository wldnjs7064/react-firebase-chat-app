import { useCallback, useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
// import { collection, addDoc } from "firebase/firestore";
// import { db } from "config/firebase";
import { useNavigate } from "react-router-dom";
import ToastEditor from "components/ToastEditor";
import styled from "styled-components";

// const NoSsrEditor = dynamic(() => import("components/TuiEditor"), {
//   ssr: false,
// });

const Page = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const ref = useRef(null);

  const handleGoBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  alert(errors.title?.message);

  return (
    <>
      <div>
        <form
          onSubmit={handleSubmit(async (data) => {
            try {
              const editorIns = ref?.current?.getInstance();
              // 에디터 작성 내용 markdown으로 저장
              const contentMark = editorIns.getMarkdown();

              // contentMark 길이 체크
              if (contentMark?.length === 0) {
                throw new Error("내용을 입력해주세요.");
              }

              // add firestore
              //   await addDoc(collection(db, "posts"), {
              //     title: data.title,
              //     content: contentMark,
              //     createdAt: new Date(),
              //   });
              toast.success("포스트를 작성했습니다.", {
                autoClose: 1000,
              });
            } catch (e) {
              console.log(e);
              toast.error(`${e}` || "다시 시도해주세요.", {
                autoClose: 1000,
              });
            }
          })}
        >
          <div
            style={{
              padding: "50px 100px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <label style={{ fontFamily: "pretendard" }}>제목</label>
            <Title
              {...register("title", {
                required: "제목은 필수 입력 사항입니다.",
              })}
              type="text"
              id="title"
              name="title"
              placeholder="제목을 입력해주세요"
            />
          </div>
          <ToastEditor />
          {/* <NoSsrEditor content="" /> */}
          <Buttons>
            <Button onClick={handleGoBack}>뒤로가기</Button>
            <Button type="submit">작성하기</Button>
          </Buttons>
        </form>
      </div>
    </>
  );
};

const Title = styled.input`
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 95%;
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
