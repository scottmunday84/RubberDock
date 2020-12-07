import React, {
    cloneElement,
    Component,
    createRef,
    FunctionComponent,
    ReactElement,
    ReactNode, Ref,
    useEffect, useRef,
    useState
} from "react";
import {v4 as uuid} from "uuid";
import Item from "./Item";
import Tab from "./Tab";
import Resizer from "./Resizer";

type ChildProps = {
    id: string,
    resizerId: string,
    child: ReactNode,
};

const GridGroupItem: FunctionComponent<ChildProps> = ({id, resizerId, child}) => {
    let itemRef = useRef();

    function isItem(x): x is Item {
        if ((x as Item).type === Item) {
            return true;
        }
        return false;
    }

    const [isActive, setIsActive] = useState(false);
    const [isMaximized, setIsMaximized] = useState(false);
    const onMaximize = () => setIsMaximized(true);
    const onMinimize = () => setIsMaximized(false);
    const onClose = () => {
        let item = itemRef.current;
        let resizer = document.getElementById(resizerId);
        item.parentNode.removeChild(item);
        if (resizer) {
            resizer.parentNode.removeChild(resizer);
        }
    }

    useEffect(() => {
        setIsActive(true);
    });

    return isItem(child) ? (
        <div ref={itemRef} key={id} id={id} className={`untitled-layout__item untitled-layout__child ${isActive ? 'active' : ''} ${isMaximized ? 'maximize' : ''}`}>
            <Tab label={child.props.title ?? "Untitled"} isMaximized={isMaximized} onMaximize={onMaximize} onMinimize={onMinimize} onClose={onClose}  />
            {child}
        </div>) : cloneElement(child, {key: id, id: id});
}

class GridGroup extends Component {
    className;
    AnyResizer;

    render() {
        let parentRef = createRef();

        return (
            <div ref={parentRef} className={`${this.className} untitled-layout__parent`} {...this.props}>
                {React.Children.map(this.props.children, (child: ReactElement, index) => {
                    // Create new child
                    if (index === (this.props.children as Array<ReactNode>).length - 1) {
                        return (<GridGroupItem id={uuid()} child={child} />);
                    }

                    const childId = uuid();
                    let resizerId = uuid();

                    return [
                        (<GridGroupItem id={childId} resizerId={resizerId} child={child} />),
                        (<this.AnyResizer key={uuid()} id={resizerId} parentRef={parentRef} leftId={childId} />)];
                })}
            </div>);
    }
}

export default GridGroup;
