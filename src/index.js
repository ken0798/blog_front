import React from "react";
import ReactDOM from "react-dom/client";
import RouterLayer from "./routes";
import { Toaster } from "react-hot-toast";
import "./index.css";
import AuthProvider from "./context/user";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterLayer />
    </AuthProvider>
    <Toaster />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
