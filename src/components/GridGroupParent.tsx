import React, {ReactElement, ReactNode, useEffect, useRef, useState} from "react";
import GridGroupChild from "./GridGroupChild";
import {v4 as uuid} from "uuid";

const GridGroupParent = props => {
    let {className, resizer} = props;
    const [children, setChildren] = useState(props.children instanceof Array ? props.children : [props.children]);
    const [childrenIds, setChildrenIds]  = useState(Array.from({length: children.length}, () => uuid()));
    const ref = useRef();

    if (children.length === 0) {  // Automatically collapse parent if there are no children
        return null;
    }

    return (
        <div ref={ref} className={className}>
            {children.map((child, index) => {
                const onClose = () => {
                    // Remove child
                    let newChildren = [...children];
                    newChildren.splice(index, 1);
                    setChildren(newChildren);

                    // Remove child ID
                    let newChildrenIds = [...childrenIds];
                    newChildrenIds.splice(index, 1);
                    setChildrenIds(newChildrenIds);
                };

                return (<GridGroupChild key={childrenIds[index]} onClose={onClose} item={child} resizer={index < children.length - 1 ? resizer : null} />);
            })}
        </div>);
};

export default GridGroupParent;
