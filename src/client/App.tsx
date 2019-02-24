import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Top from './Components/Top';
import InputToken from './Components/InputToken';
import useIcons from '../util/useIcons';
import Copyright from './Components/Copyright';
import Controller from './Components/Controller';
import { Store } from './stores/Store';
useIcons();

// form入力中でも消せるようにする
window.setInterval(() => {
  window.onbeforeunload = null;
}, 1000);

@inject('store')
@observer
export default class App extends Component<{ store?: Store }, {}> {
  constructor(props: any) {
    super(props);
  }
  render() {
    return (
      <div>
        <Top />
        <InputToken />
        {this.props.store!.clientStatus && <Controller />}
        <Copyright />
      </div>
    );
  }
}
