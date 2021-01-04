import {ActionTypes} from "../util/common";

export const inDrag = dispatch => () => dispatch({type: ActionTypes.InDrag});
export const outDrag = dispatch => () => dispatch({type: ActionTypes.OutDrag});
