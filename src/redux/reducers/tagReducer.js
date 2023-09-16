import { FilterId } from "libs/types/filter";

const initialState = {
  tagSelections: Array(FilterId.length).fill(false),
};

const tagReducer = (state = initialState, action) => {
  switch (action.type) {
    case "TOGGLE_TAG":
      const newSelections = [...state.tagSelections];
      newSelections[action.index] = !newSelections[action.index];
      return { ...state, tagSelections: newSelections };
    default:
      return state;
  }
};

export default tagReducer;
