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
 SEARCH_BOX_VALUE
} from './ActionTypes';



export const usernameSet = (text) => dispatch => {
  // console.log("Action  ",text)
  dispatch({
    type: USERNAME_SET,
    payload: text,
  });
  
};
export const useridSet = (text) => dispatch => {
  // console.log("Action ",text)
  dispatch({
    type: USERID_SET,
    payload: text,
  });
  
};

export const chatUserNameSet = (text) => dispatch => {
  // console.log("Action ",text)
  dispatch({
    type: CHATUSERNAME_SET,
    payload: text,
  });
  
};

export const replyListSet = (text) => dispatch => {
  // console.log("Action ",text)
  dispatch({
    type: REPLY_LIST,
    payload: text,
  });
  
};

export const modalVisibleSet=bool=>dispatch=>{
  dispatch({
    type:MODAL_VISIBLE,
    payload:bool
  })
}

export const setCommentAdded=bool=>dispatch=>{
  dispatch({
    type:COMMENT_ADDED,
    payload:bool
  })
}

export const avatarSet=link=>dispatch=>{
  dispatch({
    type:AVATAR_SET,
    payload:link
  })
}

export const setFriendList=(list)=>dispatch=>{
  dispatch({
    type:FRIEND_LIST,
    payload:list
  })
}

export const searchBoxValueChanged=(friend_list,search)=>dispatch=>{

      var filtered_friendList=friend_list.filter(item=>item.username.includes(search,0))
      console.log("Filtered friend",filtered_friendList)
      dispatch({
          type:FILTER_FRIEND_LIST,
          payload:filtered_friendList,
      })
      dispatch({
          type:SEARCH_BOX_VALUE,
          payload:search
      })
  
}
// export const usernameSet = text => {
//   return {
//     type: USERNAME_SET,
//     payload: text,
//   };
// };
