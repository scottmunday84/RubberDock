import {ActionTypes} from "../util/common";

let initialState = {};

const registerItem = (state, id, item = null, itemState = null) => {
    if (id in state) {
        let item = state[id];

        return {
            ...state,
            [id]: {
                ...item,
                refs: item.refs + 1,
            }
        };
    }

    return {
        ...state,
        [id]: {
            item,
            isFullscreen: false,
            refs: 1,
            state: itemState
        }
    };
}

const deregisterItem = (state, id) => {
    if (!(id in state)) {
        return state;
    }

    // If the refs are greater than 1
    let item = state[id];
    if (item.refs > 1) {
        return {
            ...state,
            [id]: {
                ...item,
                refs: item.refs - 1
            }
        }
    }

    // Remove item
    let {[id]: _, ...items} = state;

    return items;
};

const toggleItemFullscreen = (state, id) => {
    if (!(id in state)) {
        return state;
    }

    let item = {...state[id]};
    item.isFullscreen = !item.isFullscreen;

    return {
        ...state,
        [id]: {...item}
    };
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.ItemRegister: {
            const {id, item, state: itemState} = action.payload;

            return registerItem(state, id, item, itemState);
        }
        case ActionTypes.ItemDeregister:
            return deregisterItem(state, action.payload.id);
        case ActionTypes.ItemToggleFullscreen:
            return toggleItemFullscreen(state, action.payload);
        case ActionTypes.ItemDrop:
            return registerItem(state, action.payload.id);
        default:
            return state;
    }
};

export default reducer;
