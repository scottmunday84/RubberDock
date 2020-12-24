import React, {cloneElement, useEffect, useState} from "react";
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
        registerStack,
        deregisterStack,
        deregisterItem,
        dropItem} = props;

    children = children instanceof Array ? children : [children];
    children = children.map(x => ({
        ...x,
        id: x.id || uuid()
    }));

    const [tabsHeight, setTabsHeight] = useState();

    useEffect(() => {
        let current = itemRef.current;
        setTabsHeight(current.firstElementChild.offsetHeight);
    }, []);

    const onDragOver = event => {
        event.preventDefault();
    };

    const onDrop = event => {
        const type = event.dataTransfer.getData('type');
        const stackId = event.dataTransfer.getData('stackId');
        const itemId = event.dataTransfer.getData('id');

        if (type === 'item' && items.findIndex(x => x.id === itemId) === -1) {
            dropItem(itemId);

            if (event.dataTransfer.effectAllowed === 'move') {
                setTimeout(() => deregisterItem(stackId, itemId), 0);
            }
        }
    };

    useEffect(() => {
        registerStack();

        return deregisterStack;
    }, []);

    return (
        <div ref={itemRef} className={`rubber-dock__stack active`}>
            <div className={`rubber-dock__stack__item-tabs`} onDragOver={onDragOver} onDrop={onDrop}>
                {(items || children).map((item, index) => {
                    let {id: itemId} = item;
                    let _item = item?.item || item;
                    let {tab} = _item.props;

                    return (<ItemTab key={itemId} id={itemId} stackId={id} stackIndex={index} isFocused={focus === itemId}>
                        {tab}
                    </ItemTab>);
                })}
            </div>
            <div className={`rubber-dock__stack__items`} style={{height: `calc(100% - ${tabsHeight}px)`}}>
                {(items || children).map((item, index) => {
                    let {id: itemId} = item;
                    let _item = item?.item || item;

                    return cloneElement(_item, {key: itemId, id: itemId, stackId: id, stackIndex: index, item: _item, isFocused: focus === itemId});
                })}
            </div>
        </div>);
}

const mapStateToProps = (state, ownProps) => {
    const stack = state.stacks[ownProps.id];

    return {
        items: stack?.items?.map(x => ({
            ...state.items[x],
            id: x})),
        focus: stack?.focus
    };
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    registerStack: registerStack(dispatch).bind(null, ownProps.id),
    deregisterStack: deregisterStack(dispatch).bind(null, ownProps.id),
    deregisterItem: deregisterItem(dispatch),
    dropItem: dropItem(dispatch).bind(null, ownProps.id),
});

export default connect(mapStateToProps, mapDispatchToProps)(Stack);
