import {ActionTypes} from "../util/common";

let initialState = {
    dragging: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.InDrag:
            return {
                dragging: true
            };
        case ActionTypes.OutDrag:
            return {
                dragging: false
            };
        default:
            return initialState
    }
};

export default reducer;
