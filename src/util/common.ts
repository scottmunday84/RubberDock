import React from "react";

export type ReactType = React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean;

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
}

export const GridGroupChildEvents = {
    OnDragAndDrop: 'GridGroupChildEvents::OnDragAndDrop'
};
