import { combineReducers } from "redux";
import user from "./user_reducer";
import chatRoom from "./chatRoom_reducer";
import tagReducer from "./tagReducer";

const rootReducer = combineReducers({
  user,
  chatRoom,
  tag: tagReducer,
});

export default rootReducer;
