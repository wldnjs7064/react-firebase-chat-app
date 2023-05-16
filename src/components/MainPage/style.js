import styled from "styled-components";

export const Board = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  border: solid;
  border-width: thin;
  border-color: #cccccc;
  border-radius: 10px;
  width: 905px;
  height: 815px;
  margin-left: 620px;
`;
export const Profile = styled.div`
  border-radius: 50%;
  background-color: #cccccc;
  width: 44px;
  height: 44px;
  text-align: center;
  justify-content: center;
`;

export const Login = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 258px;
  height: 100px;
  background-color: white;
  border-radius: 10px;
  border: solid;
  border-width: thin;
  border-color: #cccccc;
  margin-left: 340px;
  font-family: "pretendard";
  font-size: 20px;
  color: #404040;
  position: absolute;
  gap: 12px;
`;
export const Categories = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: fit-content;
  gap: 16px;
  margin-right: 20px;
  margin-left: 20px;
`;

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 50px;
  background-color: white;
  border-bottom-style: solid;
  border-bottom-width: thin;
  border-bottom-color: #cccccc;
  justify-content: space-around;
  align-items: center;
`;
export const Body = styled.div`
  width: 100%;
  height: 100vh;
  justify-content: space-around;
  padding-top: 60px;
`;

export const Category = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;
  height: 100%;
  font-family: "pretendard";
  min-width: 60px;
`;

export const Icon = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  width: fit-content;
  margin-left: 340px;
  margin-right: 680px;
`;

export const SigninButton = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;
  border-radius: 999px;
  border: solid;
  border-width: thin;
  background-color: white;
  border-color: #438afc;
  padding: 7px 25px;
  font-family: "pretendard";
  color: #438afc;
  min-width: 162px;
  height: 40px;
  margin-right: 340px;
`;
