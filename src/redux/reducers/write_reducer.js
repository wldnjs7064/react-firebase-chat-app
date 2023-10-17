import { WRITE } from '../actions/types';

const InitializeWriteState = {
  title: '',
  content: '',
  like: 0,
  views: 0,
};

export const writeAction = (title, content, like, views) => ({
  type: WRITE,
  payload: { title, content, like, views },
});

const write = (state = InitializeWriteState, action) => {
  switch (action.type) {
    case WRITE:
      return {
        title: action.payload.title,
        content: action.payload.content,
        like: action.payload.like,
        views: action.payload.views,
      };
    default:
      return state;
  }
};

export default write;
