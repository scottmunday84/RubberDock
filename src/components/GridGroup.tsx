import React, {cloneElement, Fragment, forwardRef, useRef, isValidElement} from "react";
import Stack from "./Stack";
import Item from "./Item";
import Resizer from "./Resizer";
import Column from "./Column";
import Row from "./Row";

const GridGroup = props => {
    let {id, item, onClose, onDrop, onResize} = props;
    let itemRef = useRef();

    return (<Fragment>
        <GridGroupItem ref={itemRef} id={id} item={item} onClose={onClose} onDrop={onDrop} />
        {onResize ? (<Resizer itemRef={itemRef} onResize={onResize} />) : null}
    </Fragment>);
};

const GridGroupItem = forwardRef((props, ref) => {
    let {id, item, onClose, onDrop} = props;

    if (!isValidElement(item)) {
        return null;
    }

    const isGridGroup = item.type === Column || item.type === Row;
    const isStack = item.type === Stack;
    const isItem = item.type === Item;

    if (isGridGroup) {
        return cloneElement(item, {id, onClose});
    } else if (isStack) {
        return cloneElement(item, {id, itemRef: ref, onClose, onDrop});
    } else if (isItem) {
        return (<Stack id={id} itemRef={ref} onClose={onClose} onDrop={onDrop}>
            {item}
        </Stack>);
    }

    debugger;

    return null;
});

export default GridGroup;
