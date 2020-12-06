import React, {cloneElement, Component, FunctionComponent, ReactElement, ReactNode, useEffect, useState} from "react";
import {v4 as uuid} from "uuid";
import Item from "./Item";
import Tab from "./Tab";

type ChildProps = {
    id: string,
    label: string,
    child: ReactNode
};

const GridGroupItem: FunctionComponent<ChildProps> = ({id, label, child}) => {
    function isItem(x): x is Item {
        if ((x as Item).type === Item) {
            return true;
        }
        return false;
    }

    const [active, setActive] = useState(false);

    useEffect(() => {
        setActive(true);
    });

    return isItem(child) ? (
        <div key={id} id={id} className={`untitled-layout__item untitled-layout__child ${active ? 'active' : ''}`}>
            <Tab label="Here" />
            {child}
        </div>) : cloneElement(child, {key: id, id: id});
}

class GridGroup extends Component {
    className;
    AnyResizer;

    render() {
        let leftId;
        let rightId;

        return (
            <div className={`${this.className} untitled-layout__parent`}>
                {React.Children.map(this.props.children, (child: ReactElement, index) => {
                    // Create new child
                    if (index === 0) {
                        rightId = uuid();

                        return (<GridGroupItem id={rightId} label={"here"} child={child} />);
                    }

                    // Left becomes right
                    leftId = rightId;
                    rightId = uuid();

                    return [
                        (<this.AnyResizer key={uuid()} leftId={leftId} rightId={rightId} />),
                        (<GridGroupItem id={rightId} label={"here"} child={child} />)];
                })}
            </div>);
    }
}

export default GridGroup;
