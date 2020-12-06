import React, {Component, Ref} from "react";

type ResizerProps = {
    parentRef: Ref<any>,
    leftId: any,
    rightId: any
}

class Resizer extends Component<ResizerProps, {}> {
    parentBoundingClientRect;

    onMouseDown(parentRef, left, right) {
        // Get the parent container's bounding client rectangle to compare
        // this.parentBoundingClientRect = parentRef.current.getBoundingClientRect();

        let onMouseUp = () => {
            window.removeEventListener('mouseup', onMouseUp);
            window.removeEventListener('mousemove', onMouseMove);
        }
        let onMouseMove = event => this.onMouseMove(event);

        window.addEventListener('mouseup', onMouseUp);
        window.addEventListener('mousemove', onMouseMove);
    }

    onMouseMove(event) {
        throw new Error('Not implemented');
    };

    render() {
        const {parentRef, leftId, rightId} = this.props;

        return (<div
            onMouseDown={() => this.onMouseDown(parentRef, leftId, rightId)}
            className="untitled-layout__resizer">&nbsp;</div>);
    }
}

export default Resizer;
