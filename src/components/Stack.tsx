import React, {Children, cloneElement, Component, useEffect, useState} from "react";
import ItemTab from "./ItemTab";
import {v4 as uuid} from "uuid";

class Stack extends Component {
    type: any;

    constructor(props) {
        super(props);
        this.state = {
            isActive: false
        }
    }

    componentDidMount() {
        this.setState({
            isActive: true
        })
    }

    render() {
        return (<StackInner {...this.props} />);
    }
}

const StackInner = props => {
    let {itemRef, onClose: onStackClose} = props;
    let _children = props.children instanceof Array ? props.children : [props.children];
    _children = _children.map(item => ({
        id: uuid(),
        item
    }));
    const [children, setChildren] = useState(_children);
    const [focus, setFocus] = useState(0);
    const [tabsHeight, setTabsHeight] = useState();

    useEffect(() => {
        setTabsHeight(itemRef.current.firstElementChild.clientHeight);
    });

    return (
        <div ref={itemRef} className={`rubber-dock__stack active rubber-dock__psuedo-column-after`}>
            <div className={`rubber-dock__stack__item-tabs`}>
                {children.map((child, index) => {
                    let {tab} = child.item.props;
                    const onSelect = () => {
                        setFocus(index);
                    };

                    const onClose = () => {
                        // Remove child
                        let newChildren = [...children];
                        newChildren.splice(index, 1);
                        setChildren(newChildren);

                        // Focus needs to move back one value.
                        if (focus >= index) {
                            setFocus(focus - 1);
                        }

                        // If the length is 0, then close the stack
                        if (newChildren.length === 0) {
                            onStackClose();
                        }
                    };

                    return (<ItemTab key={child.id} id={child.id} onClose={onClose} onSelect={onSelect} isFocused={focus === index}>
                        {tab}
                    </ItemTab>);
                })}
            </div>
            <div className={`rubber-dock__stack__items`} style={{height: `calc(100% - ${tabsHeight}px)`}}>
                {children.map((child, index) => cloneElement(child.item, {key: child.id, id: child.id, isFocused: focus === index}))}
            </div>
        </div>);
}

export default Stack;
