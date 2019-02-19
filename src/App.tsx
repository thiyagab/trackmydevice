import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.section`
  width: 100vw;
  height: 100vh;
`;

// @ts-ignore
const App = ({ children }) => <Wrapper>{children}</Wrapper>;

export default App;
