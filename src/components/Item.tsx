import React from "react";

const Item = props => {
    const {children} = props;

    return (
        <div
            className="untitled-layout__item__outer-body">
            <div className="untitled-layout__item__inner-body">
                {children}
            </div>
        </div>);
};

export default Item;
