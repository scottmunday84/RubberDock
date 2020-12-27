import React, {cloneElement, Component, forwardRef, Fragment, useRef} from "react";
import {v4 as uuid} from "uuid";
import Stack from "./Stack";
import Item from "./Item";

class GridGroup extends Component<any, any> {
    type: any;
    className;
    resizer;

    constructor(props) {
        super(props);

        // Set children
        let children = props.children instanceof Array ? props.children : [props.children];
        children = children.map((item, index) => ({
            id: uuid(),
            item: cloneElement(item),
            canResize: index < children.length - 1
        }));

        this.state = {
            children
        };
    }

    onClose(id) {
        // Remove child
        let children = [...this.state.children];
        let index = children.findIndex(x => x.id === id);
        if (index === -1) {
            return;
        }
        children.splice(index, 1);
        if (children.length) {
            children[children.length - 1]?.canResize = false;
        }
        this.setState({
            children
        });
    }

    render() {
        const {className, resizer} = this;
        const {children} = this.state;

        if (children.length === 0) {
            return null;
        }

        return (<div className={className}>
            {children.map((child, index) => {
                return (<GridGroupInner key={child.id} id={child.id} item={child.item} onClose={() => this.onClose(child.id)} resizer={child.canResize ? resizer : null} />);
            })}
        </div>);
    }
}

const GridGroupInner = props => {
    let {id, item, onClose, resizer: Resizer} = props;
    let itemRef = useRef();

    return [
        (<GridGroupItem key={0} id={id} ref={itemRef} item={item} onClose={onClose} />),
        Resizer ? (<Resizer key={1} itemRef={itemRef} />) : null];
};

const GridGroupItem = forwardRef((props, ref) => {
    let {id, item, onClose} = props;

    const isGridGroup = (x): x is GridGroup => x.type.prototype instanceof GridGroup;
    const isStack = (x): x is Stack => x.type === Stack;
    const isItem = (x): x is Item => x.type === Item;

    if (isGridGroup(item)) {
        return cloneElement(item, {id});
    } else if (isStack(item)) {
        return cloneElement(item, {id, itemRef: ref, onClose});
    } else if (isItem(item)) {
        return (<Stack id={id} itemRef={ref} onClose={onClose}>
            {item}
        </Stack>);
    }

    return null;
});

export default GridGroup;
