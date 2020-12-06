import React from "react";

const Stack = props => {
    let {children} = props;

    return (
        <div className="untitled-layout__stack">
            {children}
        </div>);
};

export default Stack;
