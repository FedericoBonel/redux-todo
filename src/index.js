import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";
import { apiSlice } from "./features/api/apiSlice";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <ApiProvider api={apiSlice}>
        {/* <React.StrictMode> */}
        <App />
        {/* </React.StrictMode> */}
    </ApiProvider>
);
