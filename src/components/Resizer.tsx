import React, {Component, useEffect, useRef} from "react";

class Resizer extends Component {
    render() {
        return (<ResizerBody {...this.props} />);
    }
}

const ResizerBody = props => {
    let {registerChild, itemRef} = props;
    const ref = useRef();

    useEffect(() => {
        registerChild(ref);
    });

    const onMouseDown = () => {
        left = document.getElementById(leftId);

        let onMouseUp = () => {
            window.removeEventListener('mouseup', onMouseUp);
            window.removeEventListener('mousemove', onMouseMove);
        }
        let onMouseMove = event => onMouseMove(event);

        window.addEventListener('mouseup', onMouseUp);
        window.addEventListener('mousemove', onMouseMove);
    }

    const onMouseMove = event => {
        throw new Error('Not implemented');
    };

    return (<div
        ref={ref}
        className="untitled-layout__resizer"
        onMouseDown={}>&nbsp;</div>);
}

export default Resizer;
