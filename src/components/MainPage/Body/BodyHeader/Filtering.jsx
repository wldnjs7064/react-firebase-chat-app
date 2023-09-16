import React from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import styled from "styled-components";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { FilterId } from "libs/types/filter";
function Filtering() {
  const [activeFilterId, setActiveFilterId] = React.useState(false);
  const [selected, setSelected] = React.useState(false);

  // const isActive = id === activeFilterId;
  const handleClick = () => {
    setSelected(!selected);
  };

  return (
    <div>
      <TagList>
        <Icon>
          <ArrowBackIosNewIcon />
        </Icon>
        {FilterId.map((tagName, index) => (
          <Tag key={index} id={index} onClick={handleClick} tag={{ selected }}>
            #{tagName}
          </Tag>
        ))}
        <Icon>
          <ArrowForwardIosIcon />
        </Icon>
      </TagList>
    </div>
  );
}
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
export const TagList = styled.div`
  width: fit-content;
  height: 75px;
  display: flex;
  align-items: center;
  padding-left: 16px;
  gap: 12px;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;

export const Tag = styled.div`
  white-space: nowrap;
  padding: 0 12px;
  height: 40px;
  border-radius: 20px;
  border: 1px solid ${(props) => (props.tag.selected ? "#2C5AF1" : "#cccccc")};
  font-family: "pretendard";
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  color: ${(props) => (props.tag.selected ? "#2C5AF1" : "#999999")};
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;
export default Filtering;
