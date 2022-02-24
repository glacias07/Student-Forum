import { DATA_SET_FETCH, POST_TITLE, POST_CONTENT,USERNAME_SET} from "../actions/ActionTypes"

const INITIAL_STATE = {
    data_set: [],
    post_title: '',
    post_content: '',
    username:''
}

export default (state = INITIAL_STATE, action) => {
    console.log("Username=",action.payload);
    switch(action.type) {
        case DATA_SET_FETCH:
            return{...state, data_set: action.payload}
        case POST_TITLE:
            return{...state, post_title: action.payload}
        case POST_CONTENT:
            return{...state, post_content: action.payload}
        case USERNAME_SET:
            return {...state,username:action.paylaod}
        default:
            return (state)
    }
}