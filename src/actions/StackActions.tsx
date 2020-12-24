import {ActionTypes} from "../util/common";

export const registerStack = dispatch => id => dispatch({type: ActionTypes.StackRegister, payload: id});
export const deregisterStack = dispatch => id => dispatch({type: ActionTypes.StackDeregister, payload: id});

