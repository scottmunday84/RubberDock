import {Events} from "../util/common";

let groupState = {
    groups: new Set()
};

const reducer = (state = groupState, action) => {
    switch (action.type) {
        case Events.GroupRegister:
            return {
                ...state,
                groups: {
                    ...state.groups,
                    [action.payload]: {
                        items: {}
                    }
                }
            };
        case Events.GroupUnregister:
            return {
                ...state,
                groups: {
                    ...Object
                        .keys(state.groups)
                        .filter(key => key !== action.payload)
                        .map(x => ({[x]: state.groups[x]}))
                }
            }
        default:
            return state;
    }
};

export default reducer;
