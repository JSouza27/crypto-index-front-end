import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    background-color: #f3f3f3;
    color: #4D625F;
    font-family: 'Roboto', sans-serif;
  }
`;

export default GlobalStyle;
