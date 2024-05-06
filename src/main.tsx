import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import RouterComponent from "./Router";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

const root = document.getElementById("root");
if (root === null) {
  throw new Error("Element with id 'root' not found");
}

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <RouterComponent />
  </React.StrictMode>
);
