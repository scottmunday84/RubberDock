import {ActionTypes} from "../util/common";

export const registerItem = dispatch => (stackId, stackIndex, onStackClose, id, item, focus) => dispatch({type: ActionTypes.ItemRegister, payload: {stackId, stackIndex, onStackClose, id, item, focus}});
export const deregisterItem = dispatch => (stackId, id) => dispatch({type: ActionTypes.ItemDeregister, payload: {stackId, id}});
export const dropItem = dispatch => (stackId, id, newId) => dispatch({type: ActionTypes.ItemDrop, payload: {stackId, id, newId}});
export const focusItem = dispatch => (stackId, id) => dispatch({type: ActionTypes.ItemFocus, payload: {stackId, id}});
export const toggleItemFullscreen = dispatch => id => dispatch({type: ActionTypes.ItemToggleFullscreen, payload: id});
