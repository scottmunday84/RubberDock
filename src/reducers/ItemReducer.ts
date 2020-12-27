import {ActionTypes} from "../util/common";

let initialState = {};

const registerItem = (state, id, item = null) => {
    if (id in state) {
        return state;
    }

    return {
        ...state,
        [id]: {
            item: {...item},
            isFullscreen: false
        }
    };
}

const deregisterItem = (state, id) => {
    if (!(id in state)) {
        return state;
    }

    // Remove item
    let {[id]: _, ...items} = state;

    return items;
};

const copyItem = (state, stackId, id, newId) => {
    if (!(id in state) || newId in state) {
        return state;
    }

    return registerItem(state, newId, state[id].item);
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
            const {id, item} = action.payload;

            return registerItem(state, id, item);
        }
        case ActionTypes.ItemDeregister:
            return deregisterItem(state, action.payload.id);
        case ActionTypes.ItemDrop: {
            const {stackId, id, newId} = action.payload;

            return copyItem(state, stackId, id, newId);
        }
        case ActionTypes.ItemToggleFullscreen:
            return toggleItemFullscreen(state, action.payload);
        default:
            return state;
    }
};

export default reducer;
