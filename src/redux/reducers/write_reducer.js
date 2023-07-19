import { WRITE } from "../actions/types";

const InitializeWriteState = {
  title: "",
  content: "",
};

const write = (state = InitializeWriteState, action) => {
  switch (action.type) {
    case WRITE:
      return {
        title: action.title,
        content: action.content,
      };
    default:
      return state;
  }
};

export default write;
