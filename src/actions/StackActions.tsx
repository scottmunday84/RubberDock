import {ActionTypes} from "../util/common";

export const registerStack = dispatch => (id, onClose) => dispatch({type: ActionTypes.StackRegister, payload: {id, onClose}});
export const deregisterStack = dispatch => id => dispatch({type: ActionTypes.StackDeregister, payload: id});

