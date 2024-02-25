import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import ResetStyles from "./components/ResetStyles.ts";
import { GlobalStyles } from "./components/GlobalStyles.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ResetStyles />
    <GlobalStyles />
    <App />
  </React.StrictMode>
);
