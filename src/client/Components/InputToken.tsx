import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Store } from '../stores/Store';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
const KeyIcon = styled.button`
  font-size: 1.2rem;
  color: #555;
  background-color: white;
  text-align: center;
  border: solid white 5px;
  border-left: solid white 10px;
  border-bottom-left-radius: 5px;
  border-top-left-radius: 5px;
  transform: rotate(0.05deg);
`;

@inject('store')
@observer
export default class InputToken extends Component<
  { store?: Store },
  { show: boolean; status: 'normal' | 'success' | 'failed' }
> {
  constructor(props: any) {
    super(props);
    this.state = {
      show: false,
      status: 'normal',
    };
  }
  updateToken = (token: string) => {
    if (token.length === 59) this.props.store!.token = token;
  };
  onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e) {
      this.props.store!.token = e.target.value;
    }
    if (this.props.store!.token.length === 59) {
      //update only when token is correct length
      this.props
        .store!.client.login(this.props.store!.token)
        .then(() => {
          this.setState({ ...this.state, status: 'success' });
          this.props.store!.clientStatus = true;
        })
        .catch(() => {
          this.setState({ ...this.state, status: 'failed' });
          this.props.store!.clientStatus = false;
        });
    }
  };
  componentDidMount() {
    window.setTimeout(this.onChangeHandler, 0);
  }
  render() {
    return (
      <Container>
        <label>
          <KeyIcon
            disabled
            style={{
              backgroundColor: Color.InputBackground[this.state.status],
              borderColor: Color.InputBackground[this.state.status],
            }}>
            <FontAwesomeIcon icon='key' />
          </KeyIcon>
          <Input
            type={this.state.show ? 'text' : 'password'}
            name='name'
            placeholder='Paste Token here!'
            value={this.props.store!.token}
            style={{
              backgroundColor: Color.InputBackground[this.state.status],
              borderColor: Color.InputBackground[this.state.status],
            }}
            onChange={this.onChangeHandler}
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
