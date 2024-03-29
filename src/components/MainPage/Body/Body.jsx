import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ForwardArrow, ProfileIcon } from '../../../assets';
import * as S from '../style';
import Chat from './Chat/Chat';
import styled from 'styled-components';
import BodyHeader from './BodyHeader/BodyHeader';
import BoardMain from './Board/BoardMain';
import { useSelector } from 'react-redux';

function Body() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();
  const navigateLogin = () => {
    navigate('/login');
  };
  const goToRecruit = (selectedTag) => {
    navigate(`/crawling?keyword=${selectedTag}`);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const setTages = useSelector((state) => state.tag.selectedTag);

  let selectedTag = '';
  setTages.forEach((tag) => {
    if (tag.selected) selectedTag = tag.name;
  });

  return (
    <S.Body>
      <WrapperLoginChat>
        {currentUser ? (
          <S.Login>
            <img style={{ borderRadius: '100%' }} src={currentUser.photoURL} alt="" />
            <p>{currentUser.displayName}</p>
            <ForwardArrow />
          </S.Login>
        ) : (
          <S.Login onClick={navigateLogin}>
            <ProfileIcon />
            로그인해주세요
            <ForwardArrow />
          </S.Login>
        )}

        <Chat />
      </WrapperLoginChat>
      <RightWrapper>
        <BodyHeader />
        <BoardMain />
        {selectedTag && (
          <ApplyInfoBtn onClick={() => goToRecruit(selectedTag)}>
            선택한 {selectedTag} 공고 보러가기
          </ApplyInfoBtn>
        )}
      </RightWrapper>
    </S.Body>
  );
}

const RightWrapper = styled.div`
  background-color: white;
  border: solid;
  border-width: thin;
  border-color: #cccccc;
  margin: 0 15px;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  height: 805px;
`;

const ApplyInfoBtn = styled.button`
  width: 100%;
  height: 50px;
  border-radius: 10px;
  border: solid;
  border-width: thin;
  border-color: #cccccc;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
  background-color: white;
  cursor: pointer;
`;

const WrapperLoginChat = styled.div`
  display: block;
`;

export default Body;
