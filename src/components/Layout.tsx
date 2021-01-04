import React, {FunctionComponent, useEffect, useRef, useState} from "react";
import {Provider, connect} from "react-redux";
import {applyMiddleware, createStore} from "redux";
import reducer from "../reducers/index";
import Item from "./Item";
import Stack from "./Stack";
import Row from "./Row";
import Column from "./Column";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import {deregisterItem} from "../actions/ItemActions";

type LayoutComponent = Row | Column | Stack | Item;
type LayoutProps = {
    children: LayoutComponent | LayoutComponent[];
    inDrag: boolean
}

const Layout: FunctionComponent<LayoutProps> = props => {
    let {children} = props;
    let store = createStore(reducer, composeWithDevTools(
        applyMiddleware(thunk)
    ));

    return (<Provider store={store}>
        <LayoutInner>
            {children}
        </LayoutInner>
    </Provider>);
};

// LayoutInner
const mapStateToProps = state => {
    return {
        inDrag: state.layout.inDrag
    };
};

const mapDispatchToProps = dispatch => {
    return {
        deregisterItem: deregisterItem(dispatch)
    };
};

const LayoutInner = connect(mapStateToProps, mapDispatchToProps)(props => {
    let {children, inDrag, deregisterItem} = props;
    const ref = useRef();

    const onDragOver = event => {
        event.stopPropagation();
        event.preventDefault();
    };

    const onDrop = (event) => {
        const type = event.dataTransfer.getData('type');
        const stackId = event.dataTransfer.getData('stackId');
        const itemId = event.dataTransfer.getData('id');

        if (type !== 'item') {
            return;
        }

        if (event.dataTransfer.effectAllowed === 'move') {
            deregisterItem(stackId, itemId);
        }
    };

    return (<div ref={ref} className="rubber-dock__layout">
        {children}
        <span className="layout-drop-bar" style={{display: inDrag ? 'inline-block' : 'none'}}>
            <i className="fas fa-caret-left fa-2x" onDragOver={onDragOver} onDrop={onDrop}>&nbsp;</i>
            <i className="fas fa-caret-right fa-2x">&nbsp;</i>
            <i className="fas fa-caret-up fa-2x">&nbsp;</i>
            <i className="fas fa-caret-down fa-2x">&nbsp;</i>
        </span>
    </div>);
});

export default Layout;
