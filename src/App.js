import { styled } from "linaria/react";
import { css } from "linaria";
import React from "react";

const Title = styled.h1`
  font-family: sans-serif;
  font-size: 50px;
  color: #f15f79;
`;

const App = () => (
  <Title
    className={css`
      background: red;
    `}
  >
    Hello world!
  </Title>
);

export default App;