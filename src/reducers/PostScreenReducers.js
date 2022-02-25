import { USERNAME_SET, USERID_SET} from "../actions/ActionTypes"

const INITIAL_STATE = {
    username:'Hello',
    userid: 'default_userid'
}

export default (state = INITIAL_STATE, action) => {
    console.log(action.type,"=",action.payload);
    const name=action.payload
    console.log(name)
    switch(action.type) {
        case USERNAME_SET:
            return {...state,username:action.payload}
        case USERID_SET:
            return {...state,userid:action.payload}
        default:
            return state
    }
}