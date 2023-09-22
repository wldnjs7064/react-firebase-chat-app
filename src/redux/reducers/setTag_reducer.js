// reducers.js

import { SET_TAG } from 'redux/actions/types';

const initialState = [];

const setTagReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TAG:
      return {
        setTag: action.payload,
      };

    default:
      return state;
  }
};

export default setTagReducer;
