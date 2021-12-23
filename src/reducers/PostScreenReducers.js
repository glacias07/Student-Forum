import { DATA_SET_FETCH, POST_TITLE, POST_CONTENT } from "../actions/ActionTypes"

const INITIAL_STATE = {
    data_set: [],
    post_title: '',
    post_content: '',
}

export default (state = INITIAL_STATE, action) => {
    // console.log(action.payload);
    switch(action.type) {
        case DATA_SET_FETCH:
            return{...state, data_set: action.payload}
        case POST_TITLE:
            return{...state, post_title: action.payload}
        case POST_CONTENT:
            return{...state, post_content: action.payload}
        default:
            return (state)
    }
}