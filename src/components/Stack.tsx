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
    const [isTabsDragged, setIsTabsDragged] = useState(false);

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

    const onDragLeave = event => {
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

    const onTabsDragOver = event => {
        setIsTabsDragged(true);
        event.preventDefault();
    };

    const onTabsDragLeave = event => {
        setIsTabsDragged(false);
    };

    const onTabsDrop = event => {
        setIsTabsDragged(false);

        const type = event.dataTransfer.getData('type');
        const stackId = event.dataTransfer.getData('stackId');
        const itemId = event.dataTransfer.getData('id');

        if (type === 'item' && items.findIndex(x => x.id === itemId) === -1) {
            dropItem(itemId, uuid());

            if (event.dataTransfer.effectAllowed === 'move') {
                deregisterItem(stackId, itemId);
            }
        }
    };

    if ((items || children).length === 0) {
        onParentClose();

        return null;
    }

    return (<div className={`${className} active`}>
        <div ref={tabsRef} className={`${className}__item-tabs`} onDragOver={onTabsDragOver}  onDragLeave={onTabsDragLeave} onDrop={onTabsDrop}>
            <span className={isTabsDragged ? 'dragged' : ''}></span>
            {(items || children).map((item, index) => {
                let {id: itemId} = item;
                let _item = item?.item || item;
                let {tab} = _item.props;

                return (<ItemTab key={itemId} id={itemId} stackId={id} stackIndex={index} isFocused={focus === itemId}>
                    {tab}
                </ItemTab>);
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
    const stack = state.stacks[ownProps.id];

    return {
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
