import { combineReducers } from "redux";
import user from "./user_reducer";
<<<<<<< HEAD
import write from "./write_reducer";
//import chatRoom from './chatRoom_reducer';

const rootReducer = combineReducers({
  user,
  //chatRoom
  write,
=======
import chatRoom from "./chatRoom_reducer";

const rootReducer = combineReducers({
  user,
  chatRoom,
>>>>>>> d1fc7e44ffbd9a9d2b0a6c3d006c4b91dfb27418
});

export default rootReducer;
