import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

const Container = styled.div`
  font-size: 1rem;
  position: absolute;
  bottom: 10px;
  right: 10px;
  transform: rotate(0.05deg);
`;

export default class Copyright extends Component {
  render() {
    return (
      <Container>
        Made with <FontAwesomeIcon icon='heart' style={{ color: 'red' }} /> by{' '}
        <a
          style={{ color: 'lightblue' }}
          onClick={() => {
            window.open('https://jichoup.com', '_brank');
          }}>
          @JichouP
        </a>
        .
      </Container>
    );
  }
}
