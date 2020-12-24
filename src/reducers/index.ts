import stackReducer from "./StackReducer";
import itemReducer from "./ItemReducer";
import {combineReducers} from "redux";

export default combineReducers({
    stacks: stackReducer,
    items: itemReducer
});
