import { USERNAME_SET} from "../actions/ActionTypes"

const INITIAL_STATE = {
    username:'Hello'
}

export default (state = INITIAL_STATE, action) => {
    console.log(action.type,"=",action.payload);
    const name=action.payload
    console.log(name)
    switch(action.type) {
        case USERNAME_SET:
            return {...state,username:action.payload}
        default:
            return state
    }
}