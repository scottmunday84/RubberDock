import React, {Component} from "react";
import GridGroupParent from "./GridGroupParent";

class GridGroup extends Component {
    type: any;
    className;d
    resizer;

    render() {
        let {children} = this.props;

        return (<GridGroupParent className={this.className} resizer={this.resizer}>
            {children}
        </GridGroupParent>);
    }
}

export default GridGroup;
