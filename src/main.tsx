import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import ResetStyles from "./components/ResetStyles.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ResetStyles />
    <App />
  </React.StrictMode>
);
