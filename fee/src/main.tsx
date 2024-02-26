import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/login/index.tsx";
import Register from "./pages/auth/register/index.tsx";
import App from "./App.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/home" element={<App />} />
        <Route path="/login" element={<Login setToken={null} />} />
        <Route path="/register" element={<Register setToken={null} />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
