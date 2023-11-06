import React, { useEffect } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import styled from "styled-components";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useDispatch, useSelector } from "react-redux";
import { selectTag } from "redux/actions/toggle_action";

function Filtering() {
  const dispatch = useDispatch();
  const usetags = useSelector((state) => state.tag.selectedTag);

  const handleClick = (tags) => {
    usetags.forEach((tag) => {
      if (tag.selected) {
        dispatch(selectTag(tag.name));
      }
    });
    dispatch(selectTag(tags.name));
  };

  return (
    <TagList>
      <Icon>
        <ArrowBackIosNewIcon />
      </Icon>
      {usetags.map((tag) => (
        <Tag
          key={tag.name}
          selected={tag.selected}
          onClick={() => handleClick(tag)}
        >
          #{tag.name}
        </Tag>
      ))}
      <Icon>
        <ArrowForwardIosIcon />
      </Icon>
    </TagList>
  );
}

export const TagList = styled.div`
  width: fit-content;
  height: 75px;
  display: flex;
  align-items: center;
  border-radius: 10px;
  padding-left: 16px;
  gap: 12px;
  -ms-overflow-style: none;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const Icon = styled.div`
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
  font-size: medium;
  cursor: pointer;
  border-radius: 50%;
  display: flex;
  border: solid;
  border-width: thin;
  color: gray;
  border-color: #cccccc;
`;

export const Tag = styled.div`
  white-space: nowrap;
  padding: 0 12px;
  height: 40px;
  border-radius: 20px;
  border: 1px solid ${(props) => (props.selected ? "#2C5AF1" : "#cccccc")};
  font-family: "pretendard";
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  color: ${(props) => (props.selected ? "#2C5AF1" : "#999999")};
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  cursor: pointer;
`;

export default Filtering;
