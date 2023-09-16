import React, { useState, useCallback } from "react";
import { FilterId } from "libs/types/filter";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { toggleTag } from "redux/actions/toggle_action";

function SelectTag() {
  //   const [isSelected, setIsSelected] = useState(false);
  //   const [selectedTag, setSelectedTag] = useState([]);

  //   const tagSelections = useSelector((state) => state.tag.tagSelections);
  const dispatch = useDispatch();

  const tagSelected = useCallback(
    (e, index) => {
      // e.preventDefault();
      // e.stopPropagation();
      console.log("e", e);
      console.log("index", index);
      dispatch(toggleTag(index));
    },
    [dispatch]
  );

  return (
    <div>
      <Tags>
        {FilterId.map((tagName, index) => (
          <button
            onClick={() => tagSelected(tagName, index)}
            name={tagName}
            key={index}
            id={index}
            style={
              {
                //   backgroundColor: tagSelections[index] ? "red" : "white",
              }
            }
          >
            #{tagName}
          </button>
        ))}
      </Tags>
    </div>
  );
}

const Tags = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  padding: 0 100px;
  gap: 10px;
  button {
    width: fit-content;
    height: 40px;
    border-radius: 10px;
    border: solid;
    border-color: #7080b3;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;

    font-family: pretendard;
  }
`;

export default SelectTag;
