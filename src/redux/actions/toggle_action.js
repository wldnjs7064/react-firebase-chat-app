import { SELECT_TAG } from './types';

// action creators
export const selectTag = (tagName) => {
  return {
    type: SELECT_TAG,
    payload: tagName,
  };
};
