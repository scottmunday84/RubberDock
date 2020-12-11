import React, {ReactElement, ReactNode, useRef} from "react";
import GridGroupChild from "./GridGroupChild";

const GridGroupParent = props => {
    let {className, children, resizer} = props;
    const ref = useRef();

    return (
        <div ref={ref} className={className}>
            {React.Children.map(children, (child: ReactElement, index) => {
                return (<GridGroupChild key={index} item={child} resizer={index < (props.children as ReactNode[]).length - 1 ? resizer : null} />);
            })}
        </div>);
};

export default GridGroupParent;
