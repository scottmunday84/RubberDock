import Resizer from "./Resizer";

class RowResizer extends Resizer {
    onMouseMove(event) {
        const {x, y, width, height} = this.parentBoundingClientRect;

        console.log('row resizer', event.x - x, event.y - y);
    }
}

export default RowResizer;
