import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/login/index.tsx";
import Register from "./pages/auth/register/index.tsx";
import App from "./App.tsx";
import HomeAdmin from "./pages/admin/Home";
import DashBoard from "./pages/admin/Pages/Dashboard";
import Category from "./pages/admin/Pages/Categories/index.jsx";
import Product from "./pages/admin/Pages/Products";
import User from "./pages/admin/Pages/Users";

const token = localStorage.getItem("token");

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/home" element={<App />} />
        <Route path="/login" element={<Login setToken={null} />} />
        <Route path="/register" element={<Register setToken={null} />} />
        {token ?
          <>
            <Route path="/*" element={<HomeAdmin />} />
            <Route path="dashboard" element={< DashBoard />} />
            <Route path="category" element={< Category />} />
            <Route path="product" element={< Product />} />
            <Route path="user" element={< User />} />
          </>
          :
          <>
          </>
        }
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
