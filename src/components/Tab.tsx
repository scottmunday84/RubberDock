import React, {FunctionComponent} from "react";

type TabProps = {
    label: string
}

const Tab: FunctionComponent<TabProps> = ({label}) => {
    return (
        <div className="untitled-layout__item__tab">
            <div className="untitled-layout__item__tab__label">
                {label}
            </div>
        </div>);
};

export default Tab;
