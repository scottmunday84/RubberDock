import * as React from 'react';
import ReactDOM from "react-dom";
import * as l from "../src/main";

ReactDOM.render((
  <l.Layout>
    <l.Row>
      <l.Item title="Tab 1">
        <div>here</div>
      </l.Item>
      <l.Item title="Tab 2">
        <div>there</div>
      </l.Item>
      <l.Item title="Tab 3">
        <div>other there</div>
      </l.Item>
      <l.Column>
        <l.Item title="Tab 4">
          yeahhhh....
        </l.Item>
        <l.Item title="Tab 5">
          nope!
        </l.Item>
        <l.Item title="Tab 6">
          here
        </l.Item>
      </l.Column>
    </l.Row>
  </l.Layout>), document.getElementById('root'))
