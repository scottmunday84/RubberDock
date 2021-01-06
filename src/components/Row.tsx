import React, {cloneElement, Component} from "react";
import {connect} from "react-redux";
import {v4 as uuid} from "uuid";
import GridGroup from "./GridGroup";
import {GridGroupType, GridPosition} from "../util/common";
import {getChildren} from "../util/helpers";
import Column from "./Column";

class Row extends Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            children: getChildren(props.children)
        }
    }

    componentDidMount() {
        if (this.props.onBind) {
            this.props.onBind(this);
        }
    }

    onClose(id) {
        // Remove child
        let children = [...this.state.children];
        let index = children.findIndex(x => x.id === id);
        if (index === -1) {
            return;
        }
        children.splice(index, 1);

        this.setState({
            children
        });
    }

    onDrop(childId, itemId, gridGroupType: GridGroupType, gridPosition: GridPosition) {
        let items = this.props.items;
        let children = [...this.state.children];
        let index = childId !== null ?
            children.findIndex(x => x.id === childId) :
            gridPosition === GridPosition.Before ? 0 : children.length - 1;
        if (index === -1) {
            return false;
        }

        if (!(itemId in items)) {
            return false;
        }

        let item = {
            item: cloneElement(items[itemId].item),
            id: uuid()
        };

        if (gridGroupType === GridGroupType.Column) {  // Need to wrap into column
            // Build out new structure
            const childItem = cloneElement(children[index].item);

            item.item = gridPosition === GridPosition.Before ? (<Column>
                {item.item}
                {childItem}
            </Column>) : (<Column>
                {childItem}
                {item.item}
            </Column>);

            children.splice(index, 1, item);
        } else {  // Is row
            if (gridPosition === GridPosition.Before) {
                children.splice(index, 0, item);
            } else {
                children.splice(index + 1, 0, item);
            }
        }

        this.setState({
            children
        });

        return true;
    }

    onResize(event, left, right) {
        const getFlexBasis = element => element.style.flexBasis === '' ? 100.0 : parseFloat(element.style.flexBasis);
        const {x: leftX, width: leftWidth} = left.getBoundingClientRect();
        const relativeX = event.x - leftX;
        const startFlexBasisLeft = getFlexBasis(left);
        const startFlexBasisRight = getFlexBasis(right);
        const startFlexBasis = startFlexBasisLeft + startFlexBasisRight;

        // Handle flex basis
        let flexBasisLeft = Math.max(10.0 / 100.0 * startFlexBasis, relativeX / leftWidth * startFlexBasisLeft);
        let flexBasisRight = Math.max(10.0 / 100.0 * startFlexBasis, startFlexBasis - flexBasisLeft);
        flexBasisLeft = startFlexBasis - flexBasisRight;
        left.style.flexBasis = flexBasisLeft + '%';
        right.style.flexBasis = flexBasisRight + '%';
    }

    render() {
        const className = 'rubber-dock__row';
        const {children} = this.state;
        const {onClose: onParentClose} = this.props;

        if (children.length === 0) {
            if (onParentClose !== null) {
                onParentClose();
            }

            return null;
        }

        return (<div className={className}>
            {children.map((child, index) => {
                return (<GridGroup
                    key={child.id} id={child.id} item={child.item}
                    onClose={() => this.onClose(child.id)}
                    onDrop={(itemId, gridGroupType, gridPosition) => this.onDrop(child.id, itemId, gridGroupType, gridPosition)}
                    onResize={index < children.length - 1 ? this.onResize.bind(this) : null}/>);
            })}
        </div>);
    }
}

const mapStateToProps = state => {
    return {
        items: state.items
    };
};

export default connect(mapStateToProps)(Row);
