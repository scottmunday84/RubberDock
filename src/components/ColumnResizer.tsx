import React from "react";
import Resizer from "./Resizer";

class ColumnResizer extends Resizer {
    onMouseMove(event) {
        const {x, y, width, height} = this.parentBoundingClientRect;

        console.log(event.x - x, event.y - y);
    }
}

export default ColumnResizer;
