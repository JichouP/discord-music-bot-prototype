import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { TokenStore } from '../stores/TokenStore';
import { AxiosStore } from '../stores/AxiosStore';
import GuildsSelect from './GuildsSelector';
import ChannelsSelector from './ChannelSelector';

@inject('token')
@inject('axios')
@observer
export default class Controller extends Component<{ token?: TokenStore; axios?: AxiosStore }> {
  render() {
    return (
      <div>
        {this.props.axios!.guilds && <GuildsSelect />}
        {this.props.axios!.selectedGuild && <ChannelsSelector />}
      </div>
    );
  }
}
