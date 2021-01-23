import React, {cloneElement, FunctionComponent, useRef, useState} from "react";
import {connect, Provider} from "react-redux";
import {applyMiddleware, createStore} from "redux";
import reducer from "../reducers/index";
import Row from "./Row";
import Column from "./Column";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import {deregisterItem} from "../actions/ItemActions";
import {GridGroupType, GridPosition} from "../util/common";

type GridGroupComponent = Row | Column;
type LayoutProps = {
    children: GridGroupComponent;
};

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
    let {children, dragging, deregisterItem} = props;
    const ref = useRef();

    const [child, setChild] = useState(children);
    const [childRef, setChildRef] = useState(null);
    const [onDropObject, setOnDropObject] = useState(null);

    const onDragOver = event => {
        event.stopPropagation();
        event.preventDefault();
    };

    // TODO: Does the job, but ugly
    const onBind = childRef => {
        setChildRef(childRef);

        if (onDropObject !== null) {
            const {params, stackId, itemId, effectAllowed} = onDropObject;

            if (childRef.onDrop.apply(childRef, params)) {
                if (effectAllowed === 'move') {
                    deregisterItem(stackId, itemId);
                }
            }
        }
    };

    const onDrop = (event, gridGroupType: GridGroupType, gridPosition: GridPosition) => {
        const type = event.dataTransfer.getData('type');
        const stackId = event.dataTransfer.getData('stackId');
        const itemId = event.dataTransfer.getData('id');

        if (type !== 'item') {
            return;
        }

        if (child.type === Column && gridGroupType === GridGroupType.Row) {
            setChild((<Row>{child}</Row>));
            setOnDropObject({
                params: [null, itemId, gridGroupType, gridPosition],
                stackId,
                itemId,
                effectAllowed: event.dataTransfer.effectAllowed
            });
        } else if (child.type === Row && gridGroupType === GridGroupType.Column) {
            setChild((<Column>{child}</Column>));
            setOnDropObject({
                params: [null, itemId, gridGroupType, gridPosition],
                stackId,
                itemId,
                effectAllowed: event.dataTransfer.effectAllowed
            });
        } else if (childRef.onDrop(null, itemId, gridGroupType, gridPosition)) {
            if (event.dataTransfer.effectAllowed === 'move') {
                deregisterItem(stackId, itemId);
            }
        }
    };

    return (<div ref={ref} className="rubber-dock__layout">
        {cloneElement(child, {onBind})}
        <span className="layout-drop-bar" style={{display: dragging ? 'inline-block' : 'none'}}>
            <i className="fas fa-caret-left fa-2x" onDragOver={onDragOver} onDrop={event => onDrop(event, GridGroupType.Row, GridPosition.Before)}>&nbsp;</i>
            <i className="fas fa-caret-right fa-2x" onDragOver={onDragOver} onDrop={event => onDrop(event, GridGroupType.Row, GridPosition.After)}>&nbsp;</i>
            <i className="fas fa-caret-up fa-2x" onDragOver={onDragOver} onDrop={event => onDrop(event, GridGroupType.Column, GridPosition.Before)}>&nbsp;</i>
            <i className="fas fa-caret-down fa-2x" onDragOver={onDragOver} onDrop={event => onDrop(event, GridGroupType.Column, GridPosition.After)}>&nbsp;</i>
        </span>
    </div>);
});

export default Layout;
