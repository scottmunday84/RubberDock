import Resizer from "./Resizer";

class RowResizer extends Resizer {
    onMouseMove(event) {
        const {x: leftX, width: leftWidth} = this.left.getBoundingClientRect();
        const relativeX = event.x - leftX;
        let flexBasisLeft =
            relativeX / leftWidth * 100.0 *
            (this.left.style.flexBasis === "" ? 1.0 : parseFloat(this.left.style.flexBasis) / 100.0);
        flexBasisLeft = Math.max(10.0, flexBasisLeft);
        let flexBasisRight = 200.0 - flexBasisLeft;
        this.left.style.flexBasis = flexBasisLeft + '%';
        this.right.style.flexBasis = flexBasisRight + '%';
    }
}

export default RowResizer;
