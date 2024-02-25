import { createGlobalStyle } from "styled-components";
import styled from "styled-components";

export const GlobalStyles = createGlobalStyle`
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

export const FlexCenteredDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
