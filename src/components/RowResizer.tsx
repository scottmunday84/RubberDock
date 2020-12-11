import Resizer from "./Resizer";

class RowResizer extends Resizer {
    onMouseMove(event, item) {
        const {x: leftX, width: leftWidth} = item.getBoundingClientRect();
        const relativeX = event.x - leftX;
        let flexBasisLeft =
            relativeX / leftWidth * 100.0 *
            (item.style.flexBasis === "" ? 1.0 : parseFloat(item.style.flexBasis) / 100.0);
        flexBasisLeft = Math.max(10.0, flexBasisLeft);
        item.style.flexBasis = flexBasisLeft + '%';
    }
}

export default RowResizer;
