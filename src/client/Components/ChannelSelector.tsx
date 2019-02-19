import React, { Component } from 'react';
import { inject } from 'mobx-react';
import { AxiosStore } from '../stores/AxiosStore';
import Selector from './Selector';

@inject('axios')
export default class ChannelsSelector extends Component<{ axios?: AxiosStore; classes?: any }> {
  constructor(props: any) {
    super(props);
  }

  render() {
    console.log('channels', this.props.axios!.selectedGuild!.channels);
    return (
      <Selector
        items={this.props
          .axios!.selectedGuild!.channels.filter(v => v[1].type === 'text')
          .map(v => [v[1].id, v[1].name])}
        initialValue={
          (this.props.axios!.selectedGuild!.channels.find(v => v[1].name === 'music') &&
            this.props.axios!.selectedGuild!.channels.find(v => v[1].name === 'music')[1].id) || //musicチャンネルがあったらそれを優先，なければgeneral
          this.props.axios!.selectedGuild!.id
        } //generalChannelId === guildId
        onChangeHandle={(value: string) => {
          const selected = this.props.axios!.selectedGuild!.channels.find(v => v[1].id === value);
          if (selected) {
            this.props.axios!.selectedChannel! = selected;
          }
        }}
      />
    );
  }
}
