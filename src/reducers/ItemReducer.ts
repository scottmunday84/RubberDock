import {ActionTypes} from "../util/common";

let initialState = [];

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.ItemRegister:
            return {
                ...state,
                [action.payload.id]: {
                    ...action.payload,
                    isFullscreen: false
                }
            };
        case ActionTypes.ItemDeregister: {
            if (!(action.payload in state)) {
                return state;
            }
            let items = {...state};
            delete items[action.payload];

            return items;
        }
        case ActionTypes.ToggleFullscreen: {
            if (!(action.payload in state)) {
                return state;
            }
            let items = {...state};
            items[action.payload].isFullscreen = !items[action.payload].isFullscreen;

            return items;
        }
        default:
            return state;
    }
};

export default reducer;
