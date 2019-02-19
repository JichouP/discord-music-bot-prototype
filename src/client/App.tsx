import React, { Component } from 'react';
import styled from 'styled-components';
import { reaction, autorun } from 'mobx';
import { observer, inject } from 'mobx-react';
import Top from './Components/Top';
import InputToken from './Components/InputToken';
import useIcons from '../util/useIcons';
import Copyright from './Components/Copyright';
import GuildsSelect from './Components/GuildsSelector';
import { TokenStore } from './stores/TokenStore';
import { AxiosStore } from './stores/AxiosStore';
import { getGuilds } from '../util/axios';
import Loading from './Components/Loading';
import ChannelsSelector from './Components/ChannelSelector';
import Controller from './Components/Controller';
useIcons();

window.setInterval(() => {
  window.onbeforeunload = null;
}, 1000);

@inject('token')
@inject('axios')
@observer
export default class App extends Component<{ token?: TokenStore; axios?: AxiosStore }, {}> {
  constructor(props: any) {
    super(props);
  }
  componentDidMount() {
    autorun(() => {
      if (this.props.token!.status) {
        getGuilds()
          .then(res => {
            this.props.axios!.guilds = res.data.guilds;
          })
          .catch(e => console.log(e));
      }
    });
  }
  render() {
    console.log(this.props.axios!.selectedGuild);
    return (
      <div>
        <Top />
        <InputToken />
        {this.props.token!.status && <Controller />}
        <Copyright />
      </div>
    );
  }
}
