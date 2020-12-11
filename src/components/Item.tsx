import React, {Component} from "react";

type ItemProps = {
    title: string
};

type ItemState = {
    isMaximized: boolean
};

class Item extends Component<ItemProps, ItemState> {
    type: any;

    constructor(props) {
        super(props);
        this.state = {
            isMaximized: false
        }
    }

    render() {
        const {title, children} = this.props;
        const {isMaximized} = this.state;

        const onMaximize = () => this.setState({isMaximized: true});
        const onMinimize = () => this.setState({isMaximized: false});
        const onClose = () => {
            // let item = itemRef.current;
            // let resizer = document.getElementById(resizerId);
            // item.parentNode.removeChild(item);
            /*if (resizer) {
                resizer.parentNode.removeChild(resizer);
            }*/
        }

        return (<ItemInner>
            {children}
        </ItemInner>);
    }
}

const ItemInner = props => {
    let {children} = props;

    return (<div className="untitled-layout__item">
        <div className="untitled-layout__item__container">
            <div className="untitled-layout__item__body">
                {children}
            </div>
        </div>
    </div>);
};

export default Item;
