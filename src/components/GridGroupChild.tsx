import React from "react";
import GridGroupItem from "./GridGroupItem";

const GridGroupChild = props => {
    let {child, resizer: Resizer} = props;
    let refs = [];
    const registerChild = ref => {
        refs.push(ref);
    };

    return [
        (<GridGroupItem child={child} registerChild={registerChild} />),
        Resizer ? (<Resizer registerChild={registerChild} />) : null];
}

export default GridGroupChild;
