import React, {FunctionComponent} from "react";
import {Provider} from "react-redux";
import {createStore} from "redux";
import reducer from "../reducers/index";
import Item from "./Item";
import Stack from "./Stack";
import Row from "./Row";
import Column from "./Column";

type LayoutComponent = Row | Column | Stack | Item;
type LayoutProps = {
    children: LayoutComponent | LayoutComponent[];
}

const Layout: FunctionComponent<LayoutProps> = props => {
    let {children} = props;
    let store = createStore(reducer);

    return (
        <Provider store={store}>
            <div className="untitled-layout__layout">
                {children}
            </div>
        </Provider>);
};

export default Layout;
