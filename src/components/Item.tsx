import React, {Children, cloneElement, isValidElement, useEffect, useRef, useState} from "react";
import {connect} from "react-redux";
import {registerItem, toggleItemFullscreen} from "../actions/ItemActions";

const Item = props => {
    let {children, isFullscreen, isFocused, registerItem, toggleItemFullscreen} = props;
    let ref = useRef();
    const [isActive, setIsActive] = useState(false);
    useEffect(() => {
        setIsActive(true);
        registerItem();
    }, []);

    return (<div ref={ref} className={`rubber-dock__item ${isActive ? 'active' : ''} ${isFullscreen ? 'fullscreen' : ''} ${isFocused ? 'focused' : ''}`}>
        {isFullscreen ? (<i className="far fa-window-minimize fa-lg" onClick={toggleItemFullscreen} />) : ''}
        <div className="rubber-dock__item__container">
            <div className="rubber-dock__item__body">
                {Children.map(children, child => {
                    if (typeof child.type === 'function' && isValidElement(child)) {
                        try {
                            return cloneElement(child, props);
                        } catch (exception) { }
                    }

                    return child;
                })}
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
    registerItem: registerItem(dispatch).bind(null, ownProps.stackId, ownProps.stackIndex, ownProps.onStackClose, ownProps.id, ownProps.item, ownProps?.focus),
    toggleItemFullscreen: toggleItemFullscreen(dispatch).bind(null, ownProps.id)
});

export default connect(mapStateToProps, mapDispatchToProps)(Item);
