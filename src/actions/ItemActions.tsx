import {ActionTypes} from "../util/common";

export const registerItem = dispatch => (stackId, stackIndex, onStackClose, id, item, focus, state = null) => dispatch({type: ActionTypes.ItemRegister, payload: {stackId, stackIndex, onStackClose, id, item, focus, state}});
export const deregisterItem = dispatch => (stackId, id) => dispatch({type: ActionTypes.ItemDeregister, payload: {stackId, id}});
export const dropItem = dispatch => (stackId, id) => dispatch({type: ActionTypes.ItemDrop, payload: {stackId, id}});
export const focusItem = dispatch => (stackId, id) => dispatch({type: ActionTypes.ItemFocus, payload: {stackId, id}});
export const toggleItemFullscreen = dispatch => id => dispatch({type: ActionTypes.ItemToggleFullscreen, payload: id});
