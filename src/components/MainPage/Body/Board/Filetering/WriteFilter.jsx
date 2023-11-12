import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { setTag } from 'redux/actions/toggle_action';
import { FilterId } from 'libs/types/filter';

function WriteFilter() {
  const dispatch = useDispatch();
  const setTags = useSelector((state) => state.setTag.setTag);
  const onTagClick = (tagName) => {
    dispatch(setTag(tagName));
  };

  return (
    <Tags>
      {FilterId.map((tag) => (
        <TagButton
          type="button"
          key={tag.name}
          selected={setTags === tag.name}
          onClick={() => onTagClick(tag.name)}
        >
          #{tag.name}
        </TagButton>
      ))}
    </Tags>
  );
}

const Tags = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  gap: 10px;
`;

const TagButton = styled.button`
  white-space: nowrap;
  padding: 0 12px;
  height: 32px;
  border-radius: 20px;
  border: 1px solid ${(props) => (props.selected ? '#443bb6' : 'white')};
  font-family: 'Apple SD Gothic Neo';
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  color: ${(props) => (props.selected ? '#443bb6' : 'black')};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default WriteFilter;
