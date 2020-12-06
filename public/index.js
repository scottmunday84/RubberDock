import * as React from 'react';
import ReactDOM from "react-dom";
import * as l from "../src/main";

ReactDOM.render((
  <l.Layout>
    <l.Row>
      <l.Item>
        <div>here</div>
      </l.Item>
      <l.Item>
        <div>there</div>
      </l.Item>
      <l.Item>
        <div>other there</div>
      </l.Item>
      <l.Column>
        <l.Item>
          yeahhhh....
        </l.Item>
        <l.Item>
          nope!
        </l.Item>
      </l.Column>
    </l.Row>
  </l.Layout>), document.getElementById('root'))
