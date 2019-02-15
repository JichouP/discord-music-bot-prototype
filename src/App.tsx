import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background-color: #36393f;
  width: 100vw;
  height: auto;
  min-height: 100vh;
`;
const Text = styled.p`
  color: white;
`;

export default class App extends Component {
  render() {
    return (
      <Container>
        <Text>Hello,world!</Text>
      </Container>
    );
  }
}
