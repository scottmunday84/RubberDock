import React, {useRef} from "react";

const Resizer = props => {
    let {itemRef, onResize} = props;
    let left, right;
    const ref = useRef();

    const onMouseDown = () => {
        left = itemRef.current;
        right = left.nextSibling.nextSibling;

        let onMouseUp = () => {
            window.removeEventListener('mouseup', onMouseUp);
            window.removeEventListener('mousemove', onMouseMove);
        }
        let onMouseMove = event => onResize(event, left, right);

        window.addEventListener('mouseup', onMouseUp);
        window.addEventListener('mousemove', onMouseMove);
    }

    return (<div
        ref={ref}
        className="rubber-dock__resizer"
        onMouseDown={() => onMouseDown()}>&nbsp;</div>);
};

export default Resizer;
