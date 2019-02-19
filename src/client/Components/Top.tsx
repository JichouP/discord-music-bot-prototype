import React, { Component } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const Container = styled.div`
  text-align: center;
`;
const Text = styled.p`
  font-size: 6rem;
`;
export default class Top extends Component {
  render() {
    return (
      <Container>
        <Text>
          <FontAwesomeIcon icon={{ iconName: 'discord', prefix: 'fab' }} />
          {'  '}
          Music BOT
        </Text>
      </Container>
    );
  }
}
