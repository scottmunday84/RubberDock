import Resizer from "./Resizer";

class RowResizer extends Resizer {
    onMouseMove(event, left, right) {
        const {x: leftX, width: leftWidth} = left.getBoundingClientRect();
        const relativeX = event.x - leftX;
        let startFlexBasisLeft = left.style.flexBasis === '' ? 100.0 : parseFloat(left.style.flexBasis);
        let startFlexBasisRight = right.style.flexBasis === '' ? 100.0 : parseFloat(right.style.flexBasis);
        let flexBasisLeft = Math.max(10.0, relativeX / leftWidth * startFlexBasisLeft);
        let flexBasisRight = (startFlexBasisLeft + startFlexBasisRight) - flexBasisLeft;
        left.style.flexBasis = flexBasisLeft + '%';
        right.style.flexBasis = flexBasisRight + '%';
    }
}

export default RowResizer;
