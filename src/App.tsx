import React from "react";
import styled from "styled-components";

const H1 = styled.h1`
  text-align: center;
`;

const Main = styled.main`
  padding: 8px;
`;

function App() {
  return (
    <Main>
      <H1>Star Wars Top Trumps</H1>
    </Main>
  );
}

export default App;
