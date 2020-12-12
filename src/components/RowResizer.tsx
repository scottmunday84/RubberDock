import Resizer from "./Resizer";

class RowResizer extends Resizer {
    onMouseMove(event, left, right) {
        const getFlexBasis = element => element.style.flexBasis === '' ? 100.0 : parseFloat(element.style.flexBasis);
        const {x: leftX, width: leftWidth} = left.getBoundingClientRect();
        const relativeX = event.x - leftX;
        let startFlexBasisLeft = getFlexBasis(left);
        let startFlexBasisRight = getFlexBasis(right);
        let startFlexBasis = startFlexBasisLeft + startFlexBasisRight;
        let flexBasisLeft = Math.max(10.0 / 100.0 * startFlexBasis, relativeX / leftWidth * startFlexBasisLeft);
        let flexBasisRight = Math.max(10.0 / 100.0 * startFlexBasis, startFlexBasis - flexBasisLeft);
        flexBasisLeft = startFlexBasis - flexBasisRight;
        left.style.flexBasis = flexBasisLeft + '%';
        right.style.flexBasis = flexBasisRight + '%';
    }
}

export default RowResizer;
