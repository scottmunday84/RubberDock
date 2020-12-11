import {Events} from "../util/common";

let initialState = {};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case Events.ItemRegister:
            return {
                ...state,
                [action.payload.id]: true
            };
        case Events.ItemUnregister:
            return {
                ...Object
                    .keys(state)
                    .filter(key => key !== action.payload)
                    .map(x => ({[x]: state[x]}))
                };
        default:
            return state;
    }
};

export default reducer;
