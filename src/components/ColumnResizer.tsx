import Resizer from "./Resizer";

class ColumnResizer extends Resizer {
    onMouseMove(event, left, right) {
        const {y: leftY, height: leftHeight} = left.getBoundingClientRect();
        const relativeY = event.y - leftY;
        let startFlexBasisLeft = left.style.flexBasis === '' ? 100.0 : parseFloat(left.style.flexBasis);
        let startFlexBasisRight = right.style.flexBasis === '' ? 100.0 : parseFloat(right.style.flexBasis);
        let flexBasisLeft = Math.max(10.0, relativeY / leftHeight * startFlexBasisLeft);
        let flexBasisRight = (startFlexBasisLeft + startFlexBasisRight) - flexBasisLeft;
        left.style.flexBasis = flexBasisLeft + '%';
        right.style.flexBasis = flexBasisRight + '%';
    }
}

export default ColumnResizer;
