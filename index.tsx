import ReactDOM from 'react-dom';
import App from './src/client/App';

declare const exit: any;

window.onbeforeunload = typeof exit !== 'undefined' ? exit : null;

import React, { Component } from 'react';
import styled from 'styled-components';
import { observer, Provider } from 'mobx-react';
import MobxDevTools from 'mobx-react-devtools';
import useIcons from './src/util/useIcons';
import store from './src/client/stores/Store';
useIcons();

window.setInterval(() => {
  window.onbeforeunload = null;
}, 1000);

const Container = styled.div`
  background-color: #36393f;
  width: 100vw;
  height: auto;
  min-height: 100vh;
  padding: 6rem 0 0 0;
  color: white;
  user-select: none;
`;

@observer
export default class Index extends Component<{}, {}> {
  constructor(props: any) {
    super(props);
  }
  render() {
    return (
      <Container>
        <Provider store={store}>
          <App />
        </Provider>
        <MobxDevTools />
      </Container>
    );
  }
}

ReactDOM.render(<Index />, document.getElementById('root'));
