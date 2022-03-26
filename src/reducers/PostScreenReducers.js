import {
  USERNAME_SET,
  USERID_SET,
  CHATUSERNAME_SET,
  REPLY_LIST,
  MODAL_VISIBLE,
  AVATAR_SET,
  COMMENT_ADDED,
  FRIEND_LIST,
  FILTER_FRIEND_LIST,
  SEARCH_BOX_VALUE,
} from '../actions/ActionTypes';

const INITIAL_STATE = {
  username: '',
  userId: '',
  chatUsername: '',
  reply_list: [],
  modal_visible: true,
  avatar: 'https://www.nicepng.com/png/detail/933-9332131_profile-picture-default-png.png',
  comment_added: false,
  friend_list:null,
  filtered_friend_list:null,
  search:''
};

export default (state = INITIAL_STATE, action) => {
  // console.log(action.type, '=', action.payload);
  switch (action.type) {
    case USERNAME_SET:
      return {...state, username: action.payload};
    case USERID_SET:
      return {...state, userId: action.payload};
    case CHATUSERNAME_SET:
      return {...state, chatUsername: action.payload};
    case REPLY_LIST:
      return {...state, reply_list: action.payload};
    case MODAL_VISIBLE:
      return {...state, modal_visible: action.payload};
    case AVATAR_SET:
      return {...state, avatar: action.payload};
    case COMMENT_ADDED:
      return {...state, comment_added: action.payload};
    case FRIEND_LIST:
      return{...state,friend_list:action.payload}
    case FILTER_FRIEND_LIST:
      return{...state,filtered_friend_list:action.payload}
    case SEARCH_BOX_VALUE:
      return{...state,search:action.payload}

    default:
      return state;
  }
};
