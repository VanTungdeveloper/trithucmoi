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
import ProductPage from "./pages/client/page/Product/index.tsx";
import ContactPage from "./pages/client/page/Contact/index.tsx";
import HomeClient from "./pages/client/Home.tsx";

const token = localStorage.getItem("token");

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<HomeClient />} />
        <Route path="/home/*" element={<HomeClient />} />
        <Route path="/login" element={<Login setToken={null} />} />
        <Route path="/register" element={<Register setToken={null} />} />
        <Route path="home/menu/*" element={<ProductPage />} />
        <Route path="home/contact/*" element={<ContactPage />} />
        {token ?
          <>
            <Route path="admin/*" element={<HomeAdmin />} />
            <Route path="admin/dashboard" element={< DashBoard />} />
            <Route path="admin/category" element={< Category />} />
            <Route path="admin/product" element={< Product />} />
            <Route path="admin/user" element={< User />} />
          </>
          :
          <>
          </>
        }
      </Routes>
    </BrowserRouter>
  </>
);
