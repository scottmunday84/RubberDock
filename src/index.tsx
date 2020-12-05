import './index.scss';
import '@fortawesome/fontawesome-free/css/all.min.css';

import * as React from 'react';
import ReactDOM from 'react-dom';

let Layout = props => {
    let {children} = props;

    return (
        <div className="smooth-layout__layout">
            {children}
        </div>);
}

let Stack = props => {
    let {children} = props;

    return (
        <div className="smooth-layout__stack">
            {children}
        </div>);
};

let Row = props => {
    let {children} = props;

    return (
        <div className="smooth-layout__row">
            {children.map((child, index) => {
                if (index === 0) {
                    return child;
                }

                return (<React.Fragment>
                    <Resizer></Resizer>
                    {child}
                </React.Fragment>);
            })}
        </div>);
};

let Column = props => {
    let {children} = props;

    return (
        <div className="smooth-layout__column">
            {children.map((child, index) => {
                if (index === 0) {
                    return child;
                }

                return (<React.Fragment>
                    <Resizer></Resizer>
                    {child}
                </React.Fragment>);
            })}
        </div>);
};

let Resizer = ({}) => {
    let onMouseDown = () => {
        window.addEventListener('mouseup', onMouseUp);
        window.addEventListener('mousemove', onMouseMove);
    }
    let onMouseUp = () => {
        window.removeEventListener('mouseup', onMouseUp);
        window.removeEventListener('mousemove', onMouseMove);
    }
    let onMouseMove = event => {
        console.log(event.offsetX);
    };

    return (<div
        onMouseDown={onMouseDown}
        class="smooth-layout__resizer">&nbsp;</div>);
};

let Widget = props => {
    let {children} = props;

    return (
        <div className="smooth-layout__widget">
            <div className="smooth-layout__tab">

            </div>
            <div className="smooth-layout__body">
                {children}
            </div>
        </div>);
};

ReactDOM.render((
    <Layout>
        <Row>
            <Widget>
                <div>here</div>
            </Widget>
            <Widget>
                <div>there</div>
            </Widget>
            <Widget>
                <div>other there</div>
            </Widget>
            <Column>
                <Widget>
                    yeahhhh....
                </Widget>
                <Widget>
                    nope!
                </Widget>
            </Column>
        </Row>
    </Layout>), document.getElementById('root'))
