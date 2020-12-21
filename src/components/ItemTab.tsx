import React, {useEffect, useRef, useState} from "react";
import {connect} from "react-redux";
import {toggleFullscreen} from "../actions/ItemActions";

const ItemTab = ({children, isFocused, onSelect, onClose, toggleFullscreen}) => {
    const ref = useRef();
    const [isActive, setIsActive] = useState(false);
    useEffect(() => {
        setIsActive(true);
    }, []);

    return (<div ref={ref} className={`rubber-dock__item-tab ${isActive ? 'active' : ''} ${isFocused ? 'focused' : ''}`}>
        <div className="rubber-dock__item-tab__label" onClick={onSelect}>
            {children}
        </div>
        <div className="rubber-dock__item-tab__button-bar">
            <i className="fas fa-window-maximize" onClick={toggleFullscreen} />
            <i className="fas fa-window-close" onClick={onClose} />
        </div>
    </div>);
};

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch, ownProps) => ({
    toggleFullscreen: toggleFullscreen(dispatch).bind(null, ownProps.id)
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemTab);

