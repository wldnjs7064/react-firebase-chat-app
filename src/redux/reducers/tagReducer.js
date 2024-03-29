// reducers.js

import { SELECT_TAG } from 'redux/actions/types';

const initialState = {
  selectedTag: [
    {
      name: 'FE',
      selected: false,
    },
    {
      name: 'BE',
      selected: false,
    },
    {
      name: 'AI',
      selected: false,
    },
    {
      name: 'GAME',
      selected: false,
    },
    {
      name: 'PM',
      selected: false,
    },
    {
      name: 'ETC',
      selected: false,
    },
  ],
};

const tagReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_TAG:
      return {
        ...state,
        selectedTag: state.selectedTag.map((tag) =>
          tag.name === action.payload
            ? { ...tag, selected: !tag.selected }
            : { ...tag, selected: false },
        ),
      };

    default:
      return state;
  }
};

export default tagReducer;
