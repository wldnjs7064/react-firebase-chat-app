import { SELECT_TAG, IS_SELECTED } from './types';

// action creators
export const selectTag = (tagName) => {
  return {
    type: SELECT_TAG,
    payload: tagName,
  };
};

// export const isSelected = (bool) => {
//   return {
//     type: IS_SELECTED,
//     payload: bool,
//   };
// };
