import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import "./css/style.css";
import "./css/satoshi.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* inicio de la app */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
