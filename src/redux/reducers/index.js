import { combineReducers } from 'redux';
import user from './user_reducer';
import chatRoom from './chatRoom_reducer';
import tagReducer from './tagReducer';
import setTagReducer from './setTag_reducer';

const rootReducer = combineReducers({
  user,
  chatRoom,
  tag: tagReducer,
  setTag: setTagReducer,
});

export default rootReducer;
