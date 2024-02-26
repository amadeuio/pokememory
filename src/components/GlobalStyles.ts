import { createGlobalStyle } from "styled-components";
import styled from "styled-components";

export const color = {
  text: "#0a2b0a",
  background: "#37990d",
  cardBackground: "#31890b",
  border: "#115911",
  shadow: "#2e840a",

  wrongBorder: "#c01111",
  rightBorder: "#0062ff",
};

export const globalShadow = `4px 4px 0px ${color.shadow}`;

export const globalBorderRadius = "4px";

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

  body {
    background-color: ${color.background};

  }

  @font-face {
    font-family: "Pixel Operator";
    src: url('font/8-bitArcadeIn.ttf');
    font-weight: normal;
    font-style: normal;
  }


  body {
    font-family: "Pixel Operator", monospace;
    color: ${color.text};
    font-size: 22px;
    text-shadow: ${globalShadow};
  }
`;

export const FlexCenteredDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
