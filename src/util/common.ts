import React from "react";

export const ActionTypes = {
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
