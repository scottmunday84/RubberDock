import React, {useRef} from "react";
import GridGroupItem from "./GridGroupItem";
import {v4 as uuid} from "uuid";

const GridGroupChild = props => {
    let {onClose, item, resizer: Resizer} = props;
    let itemRef = useRef();

    return [
        (<GridGroupItem id={uuid()} ref={itemRef} item={item} onClose={onClose} />),
        Resizer ? (<Resizer itemRef={itemRef} />) : null];
};

export default GridGroupChild;
