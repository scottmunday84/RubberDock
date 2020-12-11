import React from "react";
import Resizer from "./Resizer";

class ColumnResizer extends Resizer {
    onMouseMove(event, item) {
        const {y: leftY, height: leftHeight} = item.getBoundingClientRect();
        const relativeY = event.y - leftY;
        let flexBasisLeft =
            relativeY / leftHeight * 100.0 *
            (item.style.flexBasis === "" ? 1.0 : parseFloat(item.style.flexBasis) / 100.0);
        flexBasisLeft = Math.max(10.0, flexBasisLeft);
        item.style.flexBasis = flexBasisLeft + '%';
    }
}

export default ColumnResizer;
