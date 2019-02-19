import React, { Component } from 'react';
import { inject } from 'mobx-react';
import { AxiosStore } from '../stores/AxiosStore';
import Selector from './Selector';

@inject('axios')
export default class GuildsSelector extends Component<{ axios?: AxiosStore; classes?: any }> {
  constructor(props: any) {
    super(props);
  }
  componentDidMount() {
    this.props.axios!.selectedGuild = this.props.axios!.guilds![0][1];
  }
  render() {
    return (
      <Selector
        items={this.props.axios!.guilds!.map(v => [v[1].id, v[1].name])}
        initialValue={this.props.axios!.guilds![0][1].id}
        onChangeHandle={(value: string) => {
          const selected = this.props.axios!.guilds!.find(v => v[1].id === value)![1];
          if (selected) {
            this.props.axios!.selectedGuild! = selected;
          }
        }}
      />
    );
  }
}
