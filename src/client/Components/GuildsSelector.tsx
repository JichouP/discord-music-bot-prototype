import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Selector from './Selector';
import { Store } from '../stores/Store';
import { TextChannel } from 'discord.js';
import { autorun } from 'mobx';

@inject('store')
@observer
export default class GuildsSelector extends Component<
  { store?: Store; classes?: any },
  { disposer?: () => void; value?: string }
> {
  constructor(props: any) {
    super(props);
    this.state = { disposer: undefined, value: undefined };
  }
  componentDidMount() {
    this.props.store!.selectedGuild = this.props.store!.client.guilds.first();
    const selectedGuild = this.props.store!.selectedGuild; // update store and make alias
    this.props.store!.selectedTextChannel = ((selectedGuild!.channels.find(v => v.name === 'music') && // null check
      selectedGuild!.channels.find(v => v.name === 'music')) || // musicチャンネルがあったらそれを優先，なければgeneral
      selectedGuild!.channels.find(v => v.id === selectedGuild!.id)) as TextChannel; //generalChannelId === guildId
    this.setState({
      ...this.state,
      disposer: autorun(() => {
        this.setState({ ...this.state, value: this.props.store!.selectedGuild!.id });
      }),
    });
  }
  componentWillUnmount = () => {
    if (this.state.disposer) {
      this.state.disposer();
    }
  };
  onChangeHandle = (value: string) => {
    const guilds = this.props.store!.client.guilds;
    const selectedGuild = (this.props.store!.selectedGuild = guilds.find(v => v.id === value)); // update store and make alias
    this.props.store!.selectedTextChannel = ((selectedGuild!.channels.find(v => v.name === 'music') && // null check
      selectedGuild!.channels.find(v => v.name === 'music')) || // musicチャンネルがあったらそれを優先，なければgeneral
      selectedGuild!.channels.find(v => v.id === selectedGuild!.id)) as TextChannel; //generalChannelId === guildId
  };
  render() {
    const guilds = this.props.store!.client.guilds;
    return (
      <Selector
        items={guilds.map(v => [v.id, v.name])}
        initialValue={this.state.value}
        onChangeHandle={this.onChangeHandle}
      />
    );
  }
}
