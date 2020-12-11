import React, {useRef} from "react";
import GridGroupItem from "./GridGroupItem";

const GridGroupChild = props => {
    let {item, resizer: Resizer} = props;
    let itemRef = useRef();

    return [
        (<GridGroupItem ref={itemRef} item={item} />),
        Resizer ? (<Resizer itemRef={itemRef} />) : null];
}

export default GridGroupChild;
