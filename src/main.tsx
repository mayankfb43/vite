import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App.tsx";
import { setupStore } from "./app/store";
import { Provider } from "react-redux";
import "../main.scss";

createRoot(document.getElementById("root")!).render(
  <Provider store={setupStore()}>
    <App />
  </Provider>
);
