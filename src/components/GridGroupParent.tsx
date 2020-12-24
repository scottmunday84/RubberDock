import React, {useRef, useState} from "react";
import GridGroupChild from "./GridGroupChild";
import {v4 as uuid} from "uuid";

const GridGroupParent = props => {
    let {className, resizer} = props;
    const ref = useRef();
    let _children = props.children instanceof Array ? props.children : [props.children];
    _children = _children.map(item => ({
        id: uuid(),
        item
    }));
    const [children, setChildren] = useState(_children);

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
                };

                return (<GridGroupChild key={child.id} item={child.item} onClose={onClose} resizer={index < children.length - 1 ? resizer : null} />);
            })}
        </div>);
};

export default GridGroupParent;
