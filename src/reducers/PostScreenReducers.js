import {USERNAME_SET, USERID_SET} from '../actions/ActionTypes';

const INITIAL_STATE = {
  username: '',
  userId: '',
};

export default (state = INITIAL_STATE, action) => {
  console.log(action.type, '=', action.payload);
  switch (action.type) {
    case USERNAME_SET:
      return {...state, username: action.payload};
    case USERID_SET:
      return {...state, userId: action.payload};
    default:
      return state;
  }
};
