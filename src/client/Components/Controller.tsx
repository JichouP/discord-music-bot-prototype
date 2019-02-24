import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import GuildsSelect from './GuildsSelector';
import TextChannelsSelector from './TextChannelSelector';
import { Store } from '../stores/Store';

@inject('store')
@observer
export default class Controller extends Component<{ store?: Store }> {
  render() {
    return (
      <div>
        {this.props.store!.client.guilds && <GuildsSelect />}
        {this.props.store!.selectedGuild && <TextChannelsSelector />}
      </div>
    );
  }
}
