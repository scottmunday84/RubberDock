import layoutReducer from "./LayoutReducer";
import stackReducer from "./StackReducer";
import itemReducer from "./ItemReducer";
import {combineReducers} from "redux";

export default combineReducers({
    layout: layoutReducer,
    stacks: stackReducer,
    items: itemReducer
});
