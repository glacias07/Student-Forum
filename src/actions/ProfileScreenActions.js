import {BIO_CHANGE, DESIGNATION_CHANGE, USERNAME_CHANGE, WORKPLACE_CHANGE} from './ActionTypes';

export const usernameIsChanged = username => {
  return {
    type: USERNAME_CHANGE,
    payload: username,
  };
};
export const bioIsChanged = bio => {
  return {
    type: BIO_CHANGE,
    payload: bio,
  };
};
export const designationIsChanged = designation => {
  return {
    type: DESIGNATION_CHANGE,
    payload: designation,
  };
};
export const workplaceIsChanged = workplace => {
  return {
    type: WORKPLACE_CHANGE,
    payload: workplace,
  };
};
