import React, { Component, ReactElement } from 'react';
import styled, { StyledComponent } from 'styled-components';

// https://connoratherton.com/loaders

export default class Loading extends Component<{ scale?: number }> {
  BallPulse: StyledComponent<'div', any, {}, never>;
  constructor(props: any) {
    super(props);
    this.BallPulse = styled.div`
      transform: scale(${this.props.scale || 1});
      > div:nth-child(1) {
        -webkit-animation: scale 0.75s -0.24s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
        animation: scale 0.75s -0.24s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
      }

      > div:nth-child(2) {
        -webkit-animation: scale 0.75s -0.12s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
        animation: scale 0.75s -0.12s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
      }

      > div:nth-child(3) {
        -webkit-animation: scale 0.75s 0s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
        animation: scale 0.75s 0s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08);
      }

      > div {
        background-color: #fff;
        width: 15px;
        height: 15px;
        border-radius: 100%;
        margin: 2px;
        -webkit-animation-fill-mode: both;
        animation-fill-mode: both;
        display: inline-block;
      }
    `;
  }
  render() {
    return (
      <this.BallPulse>
        <div />
        <div />
        <div />
      </this.BallPulse>
    );
  }
}
