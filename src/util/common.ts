import React from "react";

export type ReactType = React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean;

export enum Events {
    ItemRegister,
    ItemUnregister
}
