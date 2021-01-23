import React, {cloneElement, isValidElement, useEffect, useRef, useState} from "react";
import {connect} from "react-redux";
import ItemTab from "./ItemTab";
import {v4 as uuid} from "uuid";
import {
    deregisterStack,
    registerStack} from "../actions/StackActions";
import {
    deregisterItem,
    dropItem
} from "../actions/ItemActions";
import {GridGroupType, GridPosition} from "../util/common";

const Stack = props => {
    let {
        children,
        id,
        items,
        focus,
        dragging,
        onClose: onParentClose,
        onDrop: onParentDrop,
        registerStack,
        deregisterStack,
        deregisterItem,
        dropItem,
        vertical: _vertical = false} = props;

    const tabsRef = useRef();
    const itemsRef = useRef();
    children = children instanceof Array ? children : [children];
    children = children.map(x => ({
        ...x,
        id: x.id || uuid(),
    }));

    const [tabsHeight, setTabsHeight] = useState(0);
    const [vertical, setVertical] = useState(_vertical);
    const [className, setClassName] = useState(_vertical ? 'rubber-dock__vstack' : 'rubber-dock__hstack');
    const [stackDraggedClass, setStackDraggedClass] = useState('');
    const [dragTabPosition, setDragTabPosition] = useState(-1);

    useEffect(() => {
        registerStack();

        return deregisterStack;
    }, []);

    // Set the stack class based on if vertical is toggled (or not)
    useEffect(() => {
        setClassName(vertical ? 'rubber-dock__vstack' : 'rubber-dock__hstack');
    }, [vertical]);

    // Set the tabs height value for properly building out the items
    useEffect(() => {
        if (vertical) {
            setTabsHeight(0);
        } else {
            let current = tabsRef.current;
            setTabsHeight(current.offsetHeight);
        }
    }, [vertical, className])

    const onDragOver = event => {
        // Calculate the angle from the mouse position and the center of the element; angle defines intention
        const {left, top, width, height} = itemsRef.current.getBoundingClientRect();
        const [cx, cy] = [width / 2 + left, height / 2 + top];
        const [dx, dy] = [event.clientX - cx, -(event.clientY - cy)];
        let theta = Math.atan2(dy, dx) * 180 / Math.PI;
        if (theta < 0) {
            theta += 360;
        }

        if (theta >= 45 && theta < 135) {
            setStackDraggedClass('dragged-before-column');
        } else if (theta >= 135 && theta < 180) {
            setStackDraggedClass('dragged-before-row');
        } else if (theta >= 180 && theta < 315) {
            setStackDraggedClass('dragged-after-column');
        } else if ((theta >= 315 || theta < 45)) {
            setStackDraggedClass('dragged-after-row');
        }

        event.preventDefault();
    };

    const onDragLeave = () => {
        setStackDraggedClass('');
    };

    const onDrop = event => {
        setStackDraggedClass('');

        const type = event.dataTransfer.getData('type');
        const stackId = event.dataTransfer.getData('stackId');
        const itemId = event.dataTransfer.getData('id');

        if (type !== 'item') {
            return;
        }

        switch (stackDraggedClass) {
            case 'dragged-before-column':
                if (!onParentDrop(itemId, GridGroupType.Column, GridPosition.Before)) {
                    return;
                }
                break;
            case 'dragged-after-column':
                if (!onParentDrop(itemId, GridGroupType.Column, GridPosition.After)) {
                    return;
                }
                break;
            case 'dragged-before-row':
                if (!onParentDrop(itemId, GridGroupType.Row, GridPosition.Before)) {
                    return;
                }
                break;
            case 'dragged-after-row':
                if (!onParentDrop(itemId, GridGroupType.Row, GridPosition.After)) {
                    return;
                }
                break;
        }

        if (event.dataTransfer.effectAllowed === 'move') {
            deregisterItem(stackId, itemId);
        }
    };

    const onTabsDragOver = (event, position) => {
        setDragTabPosition(position);
        event.preventDefault();
    };

    const onTabsDragLeave = () => {
        setDragTabPosition(-1);
    };

    const onTabsDrop = event => {
        const type = event.dataTransfer.getData('type');
        const stackId = event.dataTransfer.getData('stackId');
        const itemId = event.dataTransfer.getData('id');

        if (type === 'item' && dragTabPosition !== -1) {
            dropItem(itemId, uuid(), dragTabPosition);

            if (event.dataTransfer.effectAllowed === 'move') {
                deregisterItem(stackId, itemId);
            }
        }

        setDragTabPosition(-1);
    };

    if ((items || children).length === 0) {
        onParentClose();

        return null;
    }

    return (<div className={`${className} active`}>
        <div ref={tabsRef} className={`${className}__item-tabs`}>
            <span className={`rubber-dock__tab-divider ${dragging ? 'dragged' : ''} ${dragTabPosition === 0 ? 'hover' : ''}`} onDragOver={event => onTabsDragOver(event, 0)}  onDragLeave={event => onTabsDragLeave(event, 0)} onDrop={onTabsDrop}>&nbsp;</span>
            {(items || children).map((item, index) => {
                const position = index + 1;
                let {id: itemId} = item;
                let _item = item?.item || item;
                let {tab} = _item.props;

                return (<>
                        <ItemTab key={itemId} id={itemId} stackId={id} stackIndex={index} isFocused={focus === itemId}>
                            {tab}
                        </ItemTab>
                        <span key={position} className={`rubber-dock__tab-divider ${dragging ? 'dragged' : ''} ${dragTabPosition === position ? 'hover' : ''}`} onDragOver={event => onTabsDragOver(event, position)}  onDragLeave={onTabsDragLeave} onDrop={onTabsDrop}>&nbsp;</span>
                    </>);
            })}
            <div className="rubber-dock__item-tab__button-bar">
                <div>
                    <i className="fas fa-adjust fa-lg" onClick={() => setVertical(!vertical)} />
                </div>
            </div>
        </div>
        <div ref={itemsRef} className={`${className}__items`} style={{height: `calc(100% - ${tabsHeight}px)`}} onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}>
            <span className={stackDraggedClass}></span>
            {(items || children).map((item, index) => {
                let {id: itemId} = item;
                let _item = item?.item || item;

                return cloneElement(_item, {key: itemId, id: itemId, stackId: id, stackIndex: index, onParentClose, item: _item, isFocused: focus === itemId});
            })}
        </div>
    </div>);
};

const mapStateToProps = (state, ownProps) => {
    const dragging = state.layout.dragging;
    const stack = state.stacks[ownProps.id];

    return {
        dragging,
        items: stack?.items?.map(x => ({
            ...state.items[x],
            id: x})),
        focus: stack?.focus
    };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    registerStack: registerStack(dispatch).bind(null, ownProps.id, ownProps.onClose),
    deregisterStack: deregisterStack(dispatch).bind(null, ownProps.id),
    deregisterItem: deregisterItem(dispatch),
    dropItem: dropItem(dispatch).bind(null, ownProps.id),
});

export default connect(mapStateToProps, mapDispatchToProps)(Stack);
