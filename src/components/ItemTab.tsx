import "@fortawesome/fontawesome-free/css/all.min.css";

import React, {FunctionComponent, MouseEventHandler, ReactElement} from "react";

type TabProps = {
    label: string,
    isMaximized: boolean,
    onMaximize: MouseEventHandler,
    onMinimize: MouseEventHandler,
    onClose: MouseEventHandler
}

const ItemTab: FunctionComponent<TabProps> = ({label, isMaximized, onMaximize, onMinimize, onClose}) => {
    let toggleFullscreen = () => {
        if (!isMaximized) {
            return (<i className="fas fa-window-maximize" onClick={onMaximize} />);
        }

        return (<i className="fas fa-window-minimize" onClick={onMinimize} />);
    };

    return (
        <div className="untitled-layout__item-tab">
            <div className="untitled-layout__item-tab__label">
                {label}
            </div>
            <div className="untitled-layout__item-tab__button-bar">
                {toggleFullscreen()}
                <i className="fas fa-window-close" onClick={onClose} />
            </div>
        </div>);
};

export default ItemTab;
