import { combineReducers } from "redux";
import PostScreenReducers from "./PostScreenReducers";
import ProfileScreenReducers from "./ProfileScreenReducers";

export default combineReducers({
    postListing: PostScreenReducers,
    profileListing: ProfileScreenReducers
})