import React, {FunctionComponent} from "react";
import {Provider} from "react-redux";
import {createStore} from "redux";
import reducer from "../reducers/index";
import Item from "./Item";
import Stack from "./Stack";
import Row from "./Row";
import Column from "./Column";
import {composeWithDevTools} from "redux-devtools-extension";

type LayoutComponent = Row | Column | Stack | Item;
type LayoutProps = {
    children: LayoutComponent | LayoutComponent[];
}

const Layout: FunctionComponent<LayoutProps> = props => {
    let {children} = props;
    let store = createStore(reducer, composeWithDevTools());

    return (
        <Provider store={store}>
            <div className="rubber-dock__layout">
                {children}
            </div>
        </Provider>);
};

export default Layout;
