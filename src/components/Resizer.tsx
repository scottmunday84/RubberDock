import React, {Component, useRef} from "react";

class Resizer extends Component {
    onMouseMove(event, item) {
        throw new Error('Not implemented');
    }

    render() {
        return (<ResizerBody {...this.props} onMouseMove={this.onMouseMove} />);
    }
}

const ResizerBody = props => {
    let {itemRef, onMouseMove: _onMouseMove} = props;
    let item;
    const ref = useRef();

    const onMouseDown = () => {
        item = itemRef.current;

        let onMouseUp = () => {
            window.removeEventListener('mouseup', onMouseUp);
            window.removeEventListener('mousemove', onMouseMove);
        }
        let onMouseMove = event => _onMouseMove(event, item);

        window.addEventListener('mouseup', onMouseUp);
        window.addEventListener('mousemove', onMouseMove);
    }

    return (<div
        ref={ref}
        className="untitled-layout__resizer"
        onMouseDown={() => onMouseDown()}>&nbsp;</div>);
}

export default Resizer;
