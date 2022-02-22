import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    background-color: #E9FCE9;
    color: #4D625F;
    font-family: 'Roboto', sans-serif;
    margin: 0;
    padding: 0;
  }
`;

export default GlobalStyle;
