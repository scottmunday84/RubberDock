import {ActionTypes} from "../util/common";

let initialState = {};

const registerStack = (state, id) => {
    if (id in state) {
        return state;
    }

    return {
        ...state,
        [id]: {
            items: [],
            focus: null
        }
    };
};

const deregisterStack = (state, id) => {
    if (!(id in state)) {
        return state;
    }

    // Remove stack
    let {[id]: _, ...stacks} = state;

    return stacks;
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.StackRegister:
            return registerStack(state, action.payload);
        case ActionTypes.StackDeregister:
            return deregisterStack(state, action.payload);
        case ActionTypes.ItemRegister: {
            const {stackId, stackIndex, id: itemId, focus: itemFocus = false} = action.payload;
            const _state = registerStack(state, stackId);
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
                    items,
                    focus
                }
            };
        }
        case ActionTypes.ItemDeregister: {
            const {stackId, id: itemId} = action.payload;
            const stack = state[stackId];
            const getItemIndexById = x => stack.items.findIndex(y => y === x);

            // Remove child
            let index = getItemIndexById(itemId);
            if (index === -1) {
                return state;
            }
            let items = [...stack.items];
            items.splice(index, 1);

            // Remove the stack if no more items exist on the stack
            if (items.length === 0) {
                return deregisterStack(state, stackId);
            }

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
                    items,
                    focus
                }
            };
        }
        case ActionTypes.ItemDrop: {
            const {stackId, id: itemId} = action.payload;
            const stack = state[stackId];
            const getItemIndexById = x => stack.items.findIndex(y => y === x);
            if (getItemIndexById(itemId) !== -1) {
                return state;
            }

            // Drop item into stack
            return {
                ...state,
                [stackId]: {
                    ...stack,
                    items: [
                        ...stack.items,
                        itemId
                    ]
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
