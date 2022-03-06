import {
  USERNAME_SET,
  USERID_SET,
  CHATUSERNAME_SET,
  REPLY_LIST,
  MODAL_VISIBLE,
} from '../actions/ActionTypes';

const INITIAL_STATE = {
  username: '',
  userId: '',
  chatUsername: '',
  reply_list:[],
  modal_visible:true
};

export default (state = INITIAL_STATE, action) => {
  // console.log(action.type, '=', action.payload);
  switch (action.type) {
    case USERNAME_SET:
      return {...state, username: action.payload};
    case USERID_SET:
      return {...state, userId: action.payload};
    case CHATUSERNAME_SET:
      return{...state,chatUsername:action.payload}
    case REPLY_LIST:
      return{...state,reply_list:action.payload}
    case MODAL_VISIBLE:
      return{...state,modal_visible:action.payload}
    default:
      return state;
  }
};
