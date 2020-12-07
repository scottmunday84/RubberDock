import React, {Component, createRef, Ref} from "react";

type ResizerProps = {
    id: string,
    parentRef: Ref<any>,
    leftId: any
}

class Resizer extends Component<ResizerProps, {}> {
    resizerRef;
    parentRef;
    left;

    onMouseDown(parentRef, leftId) {
        // Get the parent container's bounding client rectangle to compare with the left/right
        this.left = document.getElementById(leftId);

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
        const {id, parentRef, leftId} = this.props;
        this.parentRef = parentRef;
        this.resizerRef = createRef();

        return (<div
            ref={this.resizerRef}
            id={id}
            onMouseDown={() => this.onMouseDown(parentRef, leftId)}
            className="untitled-layout__resizer">&nbsp;</div>);
    }
}

export default Resizer;
