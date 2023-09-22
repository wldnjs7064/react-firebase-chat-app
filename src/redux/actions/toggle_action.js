import { SELECT_TAG, SET_TAG } from './types';

// action creators
export const selectTag = (tagName) => {
  return {
    type: SELECT_TAG,
    payload: tagName,
  };
};

export const setTag = (tagName) => {
  return {
    type: SET_TAG,
    payload: tagName,
  };
};
