import {
  BIO_CHANGE,
  DESIGNATION_CHANGE,
  USERNAME_CHANGE,
  WORKPLACE_CHANGE,
} from '../actions/ActionTypes';
INITIAL_STATE = {
  username: '',
  bio: '',
  designation: '',
  workplace: '',
};

export default (state = INITIAL_STATE, action) => {
  // console.log(action);
  switch (action.type) {
    case USERNAME_CHANGE:
      return {...state, username: action.payload};
    case BIO_CHANGE:
      return {...state, bio: action.payload};
    case WORKPLACE_CHANGE:
      return {...state, workplace: action.payload};
    case DESIGNATION_CHANGE:
      return {...state, designation: action.payload};
    default:
      return state;
  }
};
