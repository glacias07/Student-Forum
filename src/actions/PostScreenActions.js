import {
  DATA_SET_FETCH,
  POST_CONTENT,
  POST_TITLE,
  USERNAME_SET,
} from './ActionTypes';

export const dataSetFetch = () => {
  return {
    type: DATA_SET_FETCH,
    payload: dataset,
  };
};

export const postTitleChange = text => {
  return {
    type: POST_TITLE,
    payload: text,
  };
};

export const postContentChange = text => {
  console.log("Action -",text)
  return {
    type: POST_CONTENT,
    payload: text,
  };
};

export const usernameSet = text => dispatch => {
  console.log("Action  ",text)
  dispatch({
    type: USERNAME_SET,
    payload: text,
  });
};

// export const usernameSet = text => {
//   return {
//     type: USERNAME_SET,
//     payload: text,
//   };
// };
