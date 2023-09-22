import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { hipTag } from 'libs/Constants/tag';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTag } from 'redux/actions/toggle_action';
import { FilterId } from 'libs/types/filter';

function SelectTag() {
  // const dispatch = useDispatch();
  // const selectedTags = useSelector((state) => state.tag.selectedTags);

  // const [tags, setTags] = useState(
  //   FilterId.map((tag) => ({
  //     tag,
  //     selected: false,
  //   }))
  // );
  // const onTagClick = (tagName) => {
  //   setTags((prevTags) =>
  //     prevTags.map((tag) =>
  //       tag.name === tagName ? { ...tag, selected: !tag.selected } : tag
  //     )
  //   );
  //   dispatch(toggleTag(tagName));
  // };

  // useEffect(() => {
  //   // Update tags based on selectedTags from Redux
  //   setTags((prevTags) =>
  //     prevTags.map((tag) => ({
  //       ...tag,
  //       selected: selectedTags.includes(tag.name),
  //     }))
  //   );
  // }, [selectedTags]);

  return (
    <div>
      <Tags>
        {FilterId.map((tag) => (
          <TagButton
            type="button"
            key={tag.name}
            // onClick={() => onTagClick(tag.name)}
            tag={tag}
          >
            #{tag.localName}
          </TagButton>
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
`;

const TagButton = styled.button`
  white-space: nowrap;
  padding: 0 12px;
  height: 32px;
  border-radius: 20px;
  /* border: 1px solid ${(props) =>
    props.tag.selected ? '#E44269' : '#cccccc'}; */
  font-family: 'Apple SD Gothic Neo';
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  /* color: ${(props) => (props.tag.selected ? '#E44269' : '#999999')}; */
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default SelectTag;
