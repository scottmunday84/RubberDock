import React from "react";
import {Provider} from "react-redux";
import {createStore} from "redux";
import reducer from "../reducers/index";

const Layout = props => {
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
