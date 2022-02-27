import {
  USERNAME_SET,
  USERID_SET
} from './ActionTypes';



export const usernameSet = (text) => dispatch => {
  console.log("Action  ",text)
  dispatch({
    type: USERNAME_SET,
    payload: text,
  });
  
};
export const useridSet = (text) => dispatch => {
  console.log("Action ",text)
  dispatch({
    type: USERID_SET,
    payload: text,
  });
  
};
// export const usernameSet = text => {
//   return {
//     type: USERNAME_SET,
//     payload: text,
//   };
// };
