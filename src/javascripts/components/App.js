import React from 'react';
import styled from 'styled-components';

export const App = ({className}) => (
  <div className={className}>
    <h1>App goes here</h1>
    <h2>{process.env.NODE_ENV}</h2>
  </div>
);

export default styled(App)`
  display: flex;
  flex-direction: column;
  margin: 0;
`;
