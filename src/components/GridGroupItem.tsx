import React, {
    cloneElement,
    forwardRef,
    FunctionComponent,
    ReactNode
} from "react";
import GridGroup from "./GridGroup";
import Item from "./Item";
import Stack from "./Stack";
import {ReactType} from "../util/common";

type GridGroupItemProps = {
    item: ReactNode
};

const GridGroupItem = forwardRef((props, ref) => {
    let {item} = props;

    function isGridGroup(x: ReactType): x is ReactType {
        return (x as GridGroup).type.prototype instanceof GridGroup;
    }

    function isStack(x: ReactType): x is ReactType {
        return (x as Stack).type === Stack;
    }

    function isItem(x: ReactType): x is ReactType {
        return (x as Item).type === Item;
    }

    if (isGridGroup(item)) {
        return cloneElement(item, {itemRef: ref});
    } else if (isStack(item)) {
        return cloneElement(item, {itemRef: ref});
    } else if (isItem(item)) {
        return (<Stack itemRef={ref}>
            {item}
        </Stack>);
    }

    return null;

}

export default GridGroupItem;
