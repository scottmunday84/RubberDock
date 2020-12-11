import React, {Children, Component} from "react";
import ItemTab from "./ItemTab";

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
        let {itemRef, children} = this.props;

        return (
            <div ref={itemRef} className={`untitled-layout__stack active`}>
                <div className={`untitled-layout__stack__item-tabs`}>
                    {Children.map(children, child => {
                        let {title} = child.props;

                        /*isMaximized={isMaximized}
                        onMaximize={onMaximize}
                        onMinimize={onMinimize}
                        onClose={onClose}*/

                        return (<ItemTab label={title ?? "Untitled"} />);
                    })}
                </div>
                <div className={`untitled-layout__stack__items`}>
                    {children}
                </div>
            </div>);
    }
}

export default Stack;
