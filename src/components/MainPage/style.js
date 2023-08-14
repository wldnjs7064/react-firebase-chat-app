import styled from "styled-components";

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
  /* margin-left: 340px; */
  font-family: "pretendard";
  font-size: 20px;
  color: #404040;
  gap: 12px;
  &:hover {
    cursor: pointer;
  }
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
  justify-content: center;
  display: flex;
  padding-top: 60px;
`;

export const Category = styled.span`
  display: flex;
  align-items: center;
  width: fit-content;
  height: 100%;
  font-family: "pretendard";
  white-space: nowrap;
  min-width: fit-content;
  &:hover {
    cursor: pointer;
    color: #438afc;
  }
`;

export const Icon = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  width: fit-content;
  margin-left: 340px;
  margin-right: 680px;
  &:hover {
    cursor: pointer;
  }
`;

export const SigninButton = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;
  border-radius: 999px;
  border: solid;
  border-width: thin;
  white-space: nowrap;
  background-color: white;
  border-color: #438afc;
  padding: 7px 25px;
  font-family: "pretendard";
  color: #438afc;
  min-width: 162px;
  height: 40px;
  margin-right: 340px;
  &:hover {
    cursor: pointer;
    background-color: (67, 138, 252, 0.2);
    color: black;
  }
`;
