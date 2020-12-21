import React from "react";

export type ReactType = React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean;

export enum ActionTypes {
    ItemRegister,
    ItemDeregister,
    ToggleFullscreen
}

export const ItemEvents = {
    OnMaximize: 'GridGroupChildEvents::OnMaximize',
    OnMinimize: 'GridGroupChildEvents::OnMinimize'
};

export const GridGroupChildEvents = {
    OnClose: 'GridGroupChildEvents::OnClose',
    OnDragAndDrop: 'GridGroupChildEvents::OnDragAndDrop'
};
