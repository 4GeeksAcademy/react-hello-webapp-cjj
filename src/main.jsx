import React from "react";
import ReactDOM from "react-dom/client";
import { Router } from "./routes";
import { AppContext } from "./store";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <AppContext>
            <Router />
        </AppContext>
    </React.StrictMode>
);