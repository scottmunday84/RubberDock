import {ActionTypes} from "../util/common";

export const registerItem = dispatch => (id, ref, state = null) => dispatch({type: ActionTypes.ItemRegister, payload: {id, ref, state}});
export const deregisterItem = dispatch => id => dispatch({type: ActionTypes.ItemDeregister, payload: id});
export const toggleFullscreen = dispatch => id => dispatch({type: ActionTypes.ToggleFullscreen, payload: id});
