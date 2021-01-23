import {ActionTypes} from "../util/common";

let initialState = {};

const registerStack = (state, id, onClose) => {
    if (id in state) {
        return state;
    }

    return {
        ...state,
        [id]: {
            items: [],
            focus: null,
            onClose
        }
    };
};

const deregisterStack = (state, id) => {
    if (!(id in state)) {
        return state;
    }

    // Remove stack
    let {[id]: stack, ...stacks} = state;
    if (stack.onClose !== undefined) {
        stack.onClose();
    }

    return stacks;
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.StackRegister: {
            const {id, onClose} = action.payload;

            return registerStack(state, id, onClose);
        }
        case ActionTypes.StackDeregister:
            return deregisterStack(state, action.payload);
        case ActionTypes.ItemRegister: {
            const {stackId, stackIndex, onStackClose, id: itemId, focus: itemFocus = false} = action.payload;
            const _state = registerStack(state, stackId, onStackClose);
            const stack = _state[stackId];
            const getItemIndexById = x => stack.items.findIndex(y => y === x);

            // Ignore if already registered
            let index = getItemIndexById(itemId);
            if (index !== -1) {
                return state;
            }

            // Insert item at location
            let items = [...stack.items];
            items.splice(stackIndex, 0, itemId);

            // Refocus item on stack (if necessary)
            let focus = itemFocus || stack.focus === null ? itemId : stack.focus;

            return {
                ...state,
                [stackId]: {
                    ...stack,
                    items,
                    focus
                }
            };
        }
        case ActionTypes.ItemDeregister: {
            const {stackId, id: itemId} = action.payload;
            const stack = state[stackId];

            if (stack === undefined) {
                return state;
            }

            const getItemIndexById = x => stack.items.findIndex(y => y === x);

            // Remove child
            let index = getItemIndexById(itemId);
            if (index === -1) {
                return state;
            }
            let items = [...stack.items];
            items.splice(index, 1);

            // Refocus the tab
            let focus = stack.focus;
            if (itemId === stack.focus) {
                if (index < items.length) {
                    focus = items[index];
                } else {
                    focus = items[items.length - 1];
                }
            }

            return {
                ...state,
                [stackId]: {
                    ...stack,
                    items,
                    focus
                }
            };
        }
        case ActionTypes.ItemDrop: {
            const {stackId, newId: itemId, position} = action.payload;
            const stack = state[stackId];
            let items = [...stack.items];
            items.splice(position, 0, itemId);

            // Drop item into stack
            return {
                ...state,
                [stackId]: {
                    ...stack,
                    items
                }
            };
        }
        case ActionTypes.ItemFocus: {
            const {stackId, id: itemId} = action.payload;
            const stack = state[stackId];
            const getItemIndexById = x => stack.items.findIndex(y => y === x);
            if (getItemIndexById(itemId) === -1) {
                return state;
            }

            // Set item focus
            return {
                ...state,
                [stackId]: {
                    ...stack,
                    focus: itemId
                }
            };
        }
        default:
            return state;
    }
};

export default reducer;
