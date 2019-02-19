import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { TokenStore } from '../stores/TokenStore';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { postToken } from '../../util/axios';

const Color = {
  ShowButtonBackground: {
    show: '#fff',
    hide: '#555',
  },
  ShowButtonText: {
    show: '#555',
    hide: '#fff',
  },
  InputBackground: {
    normal: '#fff',
    success: '#dfd',
    failed: '#fdd',
  },
};

const Container = styled.div`
  text-align: center;
`;
const Input = styled.input`
  font-size: 1.2rem;
  width: 80vw;
  text-align: center;
  border: solid white 5px;
  ::placeholder {
    transform: rotate(0.05deg);
  }
`;
const ShowButton = styled.button`
  font-size: 1.2rem;
  text-align: center;
  border: solid white 5px;
  border-bottom-right-radius: 5px;
  border-top-right-radius: 5px;
`;
const KeyIconWrapper = styled.span`
  font-size: 1.34rem;
  color: #555;
  background-color: white;
  text-align: center;
  border: solid white 5px;
  border-left: solid white 10px;
  border-bottom-left-radius: 5px;
  border-top-left-radius: 5px;
  vertical-align: -1px;
  transform: rotate(0.05deg);
`;

@inject('token')
@observer
export default class InputToken extends Component<
  { token?: TokenStore },
  { show: boolean; status: 'normal' | 'success' | 'failed' }
> {
  constructor(props: any) {
    super(props);
    this.state = {
      show: false,
      status: 'normal',
    };
  }
  componentDidMount() {
    window.setTimeout(async () => {
      if (this.props.token && this.props.token.token) {
        try {
          await postToken(this.props.token.token);
          this.setState({ ...this.state, status: 'success' });
          this.props.token.status = true;
        } catch {
          this.setState({ ...this.state, status: 'failed' });
          this.props.token.status = false;
        }
      }
    }, 0);
  }
  render() {
    return (
      <Container>
        <label>
          <KeyIconWrapper
            style={{
              backgroundColor: Color.InputBackground[this.state.status],
              borderColor: Color.InputBackground[this.state.status],
            }}>
            <FontAwesomeIcon icon='key' />
          </KeyIconWrapper>
          <Input
            type={this.state.show ? 'text' : 'password'}
            name='name'
            placeholder='Paste Token here!'
            value={this.props.token && this.props.token.token}
            style={{
              backgroundColor: Color.InputBackground[this.state.status],
              borderColor: Color.InputBackground[this.state.status],
            }}
            onChange={async e => {
              this.props.token!.token = e.target.value;
              if (this.props.token!.token.length === 59) {
                try {
                  await postToken(e.target.value);
                  this.setState({ ...this.state, status: 'success' });
                  this.props.token && (this.props.token.status = true);
                } catch {
                  this.setState({ ...this.state, status: 'failed' });
                  this.props.token && (this.props.token.status = false);
                }
              }
            }}
          />
          <ShowButton
            style={{
              backgroundColor: this.state.show ? Color.ShowButtonBackground.show : Color.ShowButtonBackground.hide,
              color: this.state.show ? Color.ShowButtonText.show : Color.ShowButtonText.hide,
              borderColor: this.state.show ? Color.ShowButtonBackground.show : Color.ShowButtonBackground.hide,
            }}
            onClick={() => {
              this.setState({ ...this.state, show: !this.state.show });
            }}>
            {this.state.show ? (
              <FontAwesomeIcon icon={{ iconName: 'eye', prefix: 'far' }} />
            ) : (
              <FontAwesomeIcon icon={{ iconName: 'eye-slash', prefix: 'far' }} />
            )}
          </ShowButton>
        </label>
      </Container>
    );
  }
}
