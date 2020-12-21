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
    const [children, setChildren] = useState(props.children instanceof Array ? props.children : [props.children]);
    const [childrenIds, setChildrenIds] = useState(Array.from({length: children.length}, () => uuid()));
    const [tabsHeight, setTabsHeight] = useState();

    useEffect(() => {
        setTabsHeight(itemRef.current.firstElementChild.offsetHeight);
    });

    try {
        return (
            <div ref={itemRef} className={`rubber-dock__stack active rubber-dock__psuedo-column-after`}>
                <div className={`rubber-dock__stack__item-tabs`}>
                    {Children.map(children, (child, index) => {
                        let {tab} = child.props;
                        const onClose = () => {
                            // Remove child
                            let newChildren = [...children];
                            newChildren.splice(index, 1);
                            setChildren(newChildren);

                            // Remove child ID
                            let newChildrenIds = [...childrenIds];
                            newChildrenIds.splice(index, 1);
                            setChildrenIds(newChildrenIds);

                            // If the length is 0, then close the stack
                            if (newChildren.length === 0) {
                                onStackClose();
                            }
                        };

                        return (<ItemTab key={childrenIds[index]} id={childrenIds[index]} onClose={onClose}>
                            {tab}
                        </ItemTab>);
                    })}
                </div>
                <div className={`rubber-dock__stack__items`} style={{height: `calc(100% - ${tabsHeight}px)`}}>
                    {Children.map(children, (child, index) => cloneElement(child, {key: index, id: childrenIds[index]}))}
                </div>
            </div>);
    } catch (exception) {
        debugger;
    }

}

export default Stack;
