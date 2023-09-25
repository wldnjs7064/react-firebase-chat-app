import { WRITE } from "../actions/types";

const InitializeWriteState = {
  title: "",
  content: "",
};

export const writeAction = (title, content) => ({
  type: WRITE,
  payload: { title, content },
});

const write = (state = InitializeWriteState, action) => {
  switch (action.type) {
    case WRITE:
      return {
        title: action.payload.title,
        content: action.payload.content,
      };
    default:
      return state;
  }
};

export default write;
