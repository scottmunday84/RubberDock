import React, {FunctionComponent} from "react";
import {Provider} from "react-redux";
import {applyMiddleware, createStore} from "redux";
import reducer from "../reducers/index";
import Item from "./Item";
import Stack from "./Stack";
import Row from "./Row";
import Column from "./Column";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";

type LayoutComponent = Row | Column | Stack | Item;
type LayoutProps = {
    children: LayoutComponent | LayoutComponent[];
}

const Layout: FunctionComponent<LayoutProps> = props => {
    let {children} = props;
    let store = createStore(reducer, composeWithDevTools(
        applyMiddleware(thunk)
    ));

    return (
        <Provider store={store}>
            <div className="rubber-dock__layout">
                {children}
            </div>
        </Provider>);
};

export default Layout;
