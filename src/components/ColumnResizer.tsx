import Resizer from "./Resizer";

class ColumnResizer extends Resizer {
    onMouseMove(event, left, right) {
        const getFlexBasis = element => element.style.flexBasis === '' ? 100.0 : parseFloat(element.style.flexBasis);
        const {y: leftY, height: leftHeight} = left.getBoundingClientRect();
        const relativeY = event.y - leftY;
        let startFlexBasisLeft = getFlexBasis(left);
        let startFlexBasisRight = getFlexBasis(right);
        let startFlexBasis = startFlexBasisLeft + startFlexBasisRight;
        let flexBasisLeft = Math.max(15.0 / 100.0 * startFlexBasis, relativeY / leftHeight * startFlexBasisLeft);
        let flexBasisRight = Math.max(15.0 / 100.0 * startFlexBasis, startFlexBasis - flexBasisLeft);
        flexBasisLeft = startFlexBasis - flexBasisRight;
        left.style.flexBasis = flexBasisLeft + '%';
        right.style.flexBasis = flexBasisRight + '%';
    }
}

export default ColumnResizer;
