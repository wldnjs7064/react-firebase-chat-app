// import { createAction, handleActions } from 'redux-actions';
// import firestore from '../../firebase/firestore';
// import dateFormat from 'dateformat';
// import board_list from './board_list';
// import board_remove from './board_remove';
// import board_save from './board_save';
// import board_read from './board_read';

// // FireStore에서 데이터를 가지고 와서 기존의 state.boards에 넣어주는 기능
// export const firebase_board_list = () => {
//     return (dispatch) => {
//         // brddate (작성된 날짜)를 기준으로 최근 데이터가 먼저 오도록 (desc) 데이터를 가지고와서
//         return firestore.collection('board').orderBy('brddate', 'desc').get().then((snapshot) => {
//             var rows = [];
//             snapshot.forEach((doc) => {
//                 var childData = doc.data();
//                 childData.brddate = dateFormat(childData.brddate.toDate(), "yyyy-mm-dd");
//                 rows.push(childData);
//             });
//             dispatch(board_list(rows));
//         });
// }
// }
// export const firebase_board_remove = ( brdno = {}) => {
//     return (dispatch) => {
//         console.log(brdno);
//         return firestore.collection('boards').doc(brdno).delete().then(() => {
//             dispatch(board_remove(brdno));
//         })
//     }
// };

// export const firebase_board_save = ( data = {}) => {
//     return (dispatch) => {
//         if (!data.brdno) {
//             var doc = firestore.collection('boards').doc();
//             data.brdno = doc.id;
//             data.brddate = Date.now();
//             return doc.set(data).then(() => {
//                 data.brddate = dateFormat(data.brddate, "yyyy-mm-dd");
//                 dispatch(board_save(data));
//             })
//         } else {
//             return firestore.collection('boards').doc(data.brdno).update(data).then(() => {
//                 dispatch(board_save(data));
//             })
//         }
//     }
// };

// const initialState = {
//     boards: [],
//     selectedBoard: {}
// };

// export default handleActions({
//     [BOARD_LIST]: (state, { payload: data }) => {
//         return {boards: data, selectedBoard: {} };
//     },
//     [BOARD_SAVE]: (state, { payload: data }) => {
//         let boards = [...state.boards];
//         let dataIdx = boards.findIndex((board) => {
//             return board.brdno === data.brdno;
//         });
//         if (dataIdx < 0) {
//             boards.splice(0, 0, data);
//         } else {
//             boards[dataIdx] = data;
//         }
//         return {boards: boards, selectedBoard: {} };
//     }
//     ,
//     [BOARD_REMOVE]: (state, { payload: data }) => {
//         let boards = [...state.boards];
//         let dataIdx = boards.findIndex((board) => {
//             return board.brdno === data;
//         });
//         boards.splice(dataIdx, 1);
//         return {boards: boards, selectedBoard: {} };
//     }
//     ,
//     [BOARD_READ]: (state, { payload: data }) => {
//         return {...state, selectedBoard: data };
//     }
// }, initialState);
