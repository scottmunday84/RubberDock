import React, {useEffect, useRef, useState} from "react";
import {connect} from "react-redux";
import {deregisterItem, registerItem, toggleFullscreen} from "../actions/ItemActions";

const Item = props => {
    let {children, isFullscreen, registerItem, deregisterItem, toggleFullscreen} = props;
    let ref = useRef();
    const [isActive, setIsActive] = useState(false);
    useEffect(() => {
        setIsActive(true);
        registerItem();

        return deregisterItem;
    }, []);

    return (<div ref={ref} className={`rubber-dock__item ${isActive ? 'active' : ''} ${isFullscreen ? 'fullscreen' : ''}`}>
        {isFullscreen ? (<i className="fas fa-window-minimize" onClick={toggleFullscreen} />) : ''}
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
    registerItem: registerItem(dispatch).bind(null, ownProps.id),
    deregisterItem: deregisterItem(dispatch).bind(null, ownProps.id),
    toggleFullscreen: toggleFullscreen(dispatch).bind(null, ownProps.id)
});

export default connect(mapStateToProps, mapDispatchToProps)(Item);
