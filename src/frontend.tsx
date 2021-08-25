import React from 'react';
import * as ReactDOM from 'react-dom';
import styled, { createGlobalStyle } from 'styled-components';
import Clock from './Clock';

const Global = createGlobalStyle`
  body {
    font-family: 'Orbitron', sans-serif;
  background: #000;
  }
`;

const Wrapper = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;


const Index = () => {

  return (
    <Wrapper>
      <Global />
      <Clock />
    </Wrapper>
  );
};

ReactDOM.render(<Index />, document.getElementById('app'));
