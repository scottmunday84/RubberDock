import React, {useEffect, useRef, useState} from "react";
import {connect} from "react-redux";
import {registerItem, toggleItemFullscreen} from "../actions/ItemActions";

const Item = props => {
    let {children, isFullscreen, isFocused, registerItem, toggleFullscreen} = props;
    let ref = useRef();
    const [isActive, setIsActive] = useState(false);
    useEffect(() => {
        setIsActive(true);
        registerItem();
    }, []);

    return (<div ref={ref} className={`rubber-dock__item ${isActive ? 'active' : ''} ${isFullscreen ? 'fullscreen' : ''} ${isFocused ? 'focused' : ''}`}>
        {isFullscreen ? (<i className="far fa-window-minimize fa-2x" onClick={toggleFullscreen} />) : ''}
        <div className="rubber-dock__item__container">
            <div className="rubber-dock__item__body">
                {children}
            </div>
        </div>
    </div>);
};

const mapStateToProps = (state, ownProps) => {
    let item = state.items[ownProps.id];

    return {
        isFullscreen: item?.isFullscreen
    };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    registerItem: registerItem(dispatch).bind(null, ownProps.stackId, ownProps.stackIndex, ownProps.id, ownProps.item, ownProps?.focus, ownProps?.state),
    toggleItemFullscreen: toggleItemFullscreen(dispatch).bind(null, ownProps.id)
});

export default connect(mapStateToProps, mapDispatchToProps)(Item);
