import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Router from "./Router";

const root = document.getElementById("root");
if (root === null) {
	throw new Error("Element with id 'root' not found");
}

ReactDOM.createRoot(root).render(
	<React.StrictMode>
		<Router />
	</React.StrictMode>,
);
