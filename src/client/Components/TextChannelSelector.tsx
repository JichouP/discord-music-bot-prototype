import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Selector from './Selector';
import { Store } from '../stores/Store';
import { TextChannel } from 'discord.js';
import { autorun } from 'mobx';

@observer
@inject('store')
export default class TextChannelsSelector extends Component<
  { store?: Store; classes?: any },
  { disposer?: () => void; value: string }
> {
  constructor(props: any) {
    super(props);
    this.state = { disposer: undefined, value: this.props.store!.selectedTextChannel!.id };
  }

  componentDidMount = () => {
    this.setState({
      ...this.state,
      disposer: autorun(() => {
        this.setState({ ...this.state, value: this.props.store!.selectedTextChannel!.id });
      }),
    });
  };

  componentWillUnmount = () => {
    if (this.state.disposer) {
      this.state.disposer();
    }
  };

  render() {
    const selectedGuild = this.props.store!.selectedGuild;
    return (
      <Selector
        items={selectedGuild!.channels.filter(v => v.type === 'text').map(v => [v.id, v.name])}
        initialValue={this.state.value}
        onChangeHandle={(value: string) => {
          const selected = selectedGuild!.channels.find(v => v.id === value) as TextChannel;
          if (selected) {
            this.props.store!.selectedTextChannel = selected;
          }
        }}
      />
    );
  }
}
