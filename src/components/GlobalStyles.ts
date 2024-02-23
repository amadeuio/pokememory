import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box
  }
  
  html,
  body,
  #root {
    height: 100%;
    width: 100%;
  }
`;

export default GlobalStyles;
