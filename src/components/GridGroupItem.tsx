import React, {cloneElement, FunctionComponent, ReactElement, ReactNode, useEffect, useRef} from "react";
import GridGroup from "./GridGroup";
import Item from "./Item";
import Stack from "./Stack";
import {ReactType} from "../util/common";

type GridGroupItemProps = {
    child: ReactNode,
    registerChild: Function
};

const GridGroupItem: FunctionComponent<GridGroupItemProps> = ({child, registerChild}) => {
    const ref = useRef();
    useEffect(() => {
        registerChild(ref);
    });

    function isGridGroup(x: ReactType): x is ReactType {
        return (x as GridGroup).type.prototype instanceof GridGroup;
    }

    function isStack(x: ReactType): x is ReactType {
        return (x as Stack).type === Stack;
    }

    function isItem(x: ReactType): x is ReactType {
        return (x as Item).type === Item;
    }

    if (isGridGroup(child)) {
        return cloneElement(child as ReactElement, {ref});
    } else if (isStack(child)) {
        return cloneElement(child, {ref});
    } else if (isItem(child)) {
        return (<Stack>
            {cloneElement(child, {ref})}
        </Stack>);
    }

    return null;

}

export default GridGroupItem;
