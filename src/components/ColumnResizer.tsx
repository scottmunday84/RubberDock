import React from "react";
import Resizer from "./Resizer";

class ColumnResizer extends Resizer {
    onMouseMove(event) {
        const {y: leftY, height: leftHeight} = this.left.getBoundingClientRect();
        const relativeY = event.y - leftY;
        let flexBasisLeft =
            relativeY / leftHeight * 100.0 *
            (this.left.style.flexBasis === "" ? 1.0 : parseFloat(this.left.style.flexBasis) / 100.0);
        flexBasisLeft = Math.max(10.0, flexBasisLeft);
        let flexBasisRight = 200.0 - flexBasisLeft;
        this.left.style.flexBasis = flexBasisLeft + '%';
        this.right.style.flexBasis = flexBasisRight + '%';
    }
}

export default ColumnResizer;
