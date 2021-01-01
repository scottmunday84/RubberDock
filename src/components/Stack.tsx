import React, {cloneElement, useEffect, useRef, useState} from "react";
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

const Stack = props => {
    let {
        children,
        itemRef,
        id,
        items,
        focus,
        onClose: onStackClose,
        registerStack,
        deregisterStack,
        deregisterItem,
        dropItem,
        vertical = false} = props;

    const tabsRef = useRef();
    children = children instanceof Array ? children : [children];
    children = children.map(x => ({
        ...x,
        id: x.id || uuid(),
    }));

    const [tabsHeight, setTabsHeight] = useState(0);
    const [stackDraggedClass, setStackDraggedClass] = useState('');
    const [isTabsDragged, setIsTabsDragged] = useState(false);

    useEffect(() => {
        if (vertical) {
            setTabsHeight(0);

            return;
        }

        // Get the tab height
        let current = tabsRef.current;
        setTabsHeight(current.offsetHeight);
        registerStack();

        return deregisterStack;
    }, [vertical]);

    const onStackDragOver = event => {
        const {left, top, width, height} = itemRef.current.getBoundingClientRect();
        const [cx, cy] = [width / 2 + left, height / 2 + top];
        const [dx, dy] = [event.clientX - cx, -(event.clientY - cy)];
        let theta = Math.atan2(dy, dx) * 180 / Math.PI;
        if (theta < 0) {
            theta += 360;
        }

        if (theta >= 45 && theta < 135) {
            setStackDraggedClass('dragged-before-row');
        } else if (theta >= 135 && theta < 180) {
            setStackDraggedClass('dragged-before-column');
        } else if (theta >= 180 && theta < 315) {
            setStackDraggedClass('dragged-after-row');
        } else if ((theta >= 315 || theta < 45)) {
            setStackDraggedClass('dragged-after-column');
        }

        event.preventDefault();
    };

    const onStackDragLeave = event => {
        setStackDraggedClass('');
    };

    const onStackDrop = event => {
        setStackDraggedClass('');
        console.log(event);
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
        onStackClose();

        return null;
    }

    const className = vertical ? 'rubber-dock__vstack' : 'rubber-dock__hstack';

    return (<div ref={itemRef} className={`${className} active ${stackDraggedClass}`}>
        <span className="grid-expander" onDragOver={onStackDragOver} onDragLeave={onStackDragLeave} onDrop={onStackDrop}>&nbsp;</span>
        <div ref={tabsRef} className={`${className}__item-tabs ${isTabsDragged ? 'dragged' : ''}`} onDragOver={onTabsDragOver}  onDragLeave={onTabsDragLeave} onDrop={onTabsDrop}>
            {(items || children).map((item, index) => {
                let {id: itemId} = item;
                let _item = item?.item || item;
                let {tab} = _item.props;

                return (<ItemTab key={itemId} id={itemId} stackId={id} stackIndex={index} isFocused={focus === itemId}>
                    {tab}
                </ItemTab>);
            })}
        </div>
        <div className={`${className}__items`} style={{height: `calc(100% - ${tabsHeight}px)`}}>
            {(items || children).map((item, index) => {
                let {id: itemId} = item;
                let _item = item?.item || item;

                return cloneElement(_item, {key: itemId, id: itemId, stackId: id, stackIndex: index, onStackClose, item: _item, isFocused: focus === itemId});
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
