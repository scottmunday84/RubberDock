import React from "react";

export const ActionTypes = {
    // Layout
    InDrag: 'InDrag',
    OutDrag: 'OutDrag',
    // Stacks
    StackRegister: 'StackRegister',
    StackDeregister: 'StackDeregister',
    // Items
    ItemRegister: 'ItemRegister',
    ItemDeregister: 'ItemDeregister',
    ItemDrop: 'ItemDrop',
    ItemFocus: 'ItemFocus',
    ItemToggleFullscreen: 'ItemToggleFullscreen'
};

export enum GridGroupType {
    Column,
    Row
}

export enum GridPosition {
    Before,
    After
}
