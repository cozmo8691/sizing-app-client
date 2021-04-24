import React from "react";
import ReactDOM from "react-dom";
import styled, { ThemeProvider } from "styled-components";
import reportWebVitals from "./reportWebVitals";

import App from "./App";
import "./index.css";
import theme from "./theme";

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.background};
  height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
`;

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Wrapper>
        <App />
      </Wrapper>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
