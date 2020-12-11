import React, {Component, useRef} from "react";

class Resizer extends Component {
    onMouseMove(event, left, right) {
        throw new Error('Not implemented');
    }

    render() {
        return (<ResizerBody {...this.props} onMouseMove={this.onMouseMove} />);
    }
}

const ResizerBody = props => {
    let {itemRef, onMouseMove: _onMouseMove} = props;
    let left, right;
    const ref = useRef();

    const onMouseDown = () => {
        left = itemRef.current;
        right = left.nextSibling.nextSibling;

        let onMouseUp = () => {
            window.removeEventListener('mouseup', onMouseUp);
            window.removeEventListener('mousemove', onMouseMove);
        }
        let onMouseMove = event => _onMouseMove(event, left, right);

        window.addEventListener('mouseup', onMouseUp);
        window.addEventListener('mousemove', onMouseMove);
    }

    return (<div
        ref={ref}
        className="untitled-layout__resizer"
        onMouseDown={() => onMouseDown()}>&nbsp;</div>);
}

export default Resizer;
