import React, {useEffect, useRef, useState} from "react";
import {connect} from "react-redux";
import {deregisterItem, focusItem, toggleItemFullscreen} from "../actions/ItemActions";

const ItemTab = ({children, stackId, id, isFocused, focusItem, deregisterItem, toggleItemFullscreen}) => {
    const ref = useRef();
    const [isActive, setIsActive] = useState(false);
    useEffect(() => {
        setIsActive(true);
    }, []);

    const onDragStart = event => {
        event.dataTransfer.setData('type', 'item');
        event.dataTransfer.setData('stackId', stackId);
        event.dataTransfer.setData('id', id);

        if (event.ctrlKey) {
            event.dataTransfer.effectAllowed = 'copy';
        } else {
            event.dataTransfer.effectAllowed = 'move';
        }
    };

    return (<div ref={ref} className={`rubber-dock__item-tab ${isActive ? 'active' : ''} ${isFocused ? 'focused' : ''}`} onDragStart={onDragStart} onDragOver={event => event.preventDefault()} draggable={true}>
        <div className="rubber-dock__item-tab__label" onClick={focusItem}>
            {children}
        </div>
        <div className="rubber-dock__item-tab__button-bar">
            <i className="far fa-window-maximize fa-lg" onClick={toggleItemFullscreen} />
            <i className="far fa-window-close fa-lg" onClick={deregisterItem} />
        </div>
    </div>);
};

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch, ownProps) => ({
    deregisterItem: deregisterItem(dispatch).bind(null, ownProps.stackId, ownProps.id),
    focusItem: focusItem(dispatch).bind(null, ownProps.stackId, ownProps.id),
    toggleItemFullscreen: toggleItemFullscreen(dispatch).bind(null, ownProps.id)
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemTab);

