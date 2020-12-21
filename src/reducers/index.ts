import itemReducer from "./ItemReducer";
import {combineReducers} from "redux";

export default combineReducers({
    items: itemReducer
});
