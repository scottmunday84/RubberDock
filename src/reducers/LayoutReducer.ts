import {ActionTypes} from "../util/common";

let initialState = {
    inDrag: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.InDrag:
            return {
                inDrag: true
            };
        case ActionTypes.OutDrag:
            return {
                inDrag: false
            };
        default:
            return initialState
    }
};

export default reducer;
