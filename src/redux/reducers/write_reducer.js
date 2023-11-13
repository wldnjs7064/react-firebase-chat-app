import { WRITE } from '../actions/types';

const InitializeWriteState = {
  title: '',
  content: '',
  like: 0,
};

export const writeAction = (title, content, like) => ({
  type: WRITE,
  payload: { title, content, like },
});

const write = (state = InitializeWriteState, action) => {
  switch (action.type) {
    case WRITE:
      return {
        title: action.payload.title,
        content: action.payload.content,
        like: action.payload.like,
      };
    default:
      return state;
  }
};

export default write;
