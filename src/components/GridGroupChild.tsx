import React, {useEffect, useRef, useState} from "react";
import GridGroupItem from "./GridGroupItem";
import {GridGroupChildEvents} from "../util/common";

const GridGroupChild = props => {
    let {onClose, item, resizer: Resizer} = props;
    let itemRef = useRef();

    return [
        (<GridGroupItem ref={itemRef} item={item} onClose={onClose} />),
        Resizer ? (<Resizer itemRef={itemRef} />) : null];
};

export default GridGroupChild;
