import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/login/index.tsx";
import Register from "./pages/auth/register/index.tsx";
import HomeAdmin from "./pages/admin/Home";
import DashBoard from "./pages/admin/Pages/Dashboard";
import Category from "./pages/admin/Pages/Categories/index.jsx";
import Product from "./pages/admin/Pages/Products";
import User from "./pages/admin/Pages/Users";
import HomeClient from "./pages/client/Home.tsx";

const user = JSON.parse(localStorage.getItem("user"));

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<HomeClient />} />
        <Route path="/home/*" element={<HomeClient />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="home/menu/*" element={<ProductPage />} />
        <Route path="home/contact/*" element={<ContactPage />} /> */}
        {user && user.role === "ADMIN" && (
          <>
            <Route path="/admin/*" element={<HomeAdmin />} />
            <Route path="/dashboard" element={<DashBoard />} />
            <Route path="/category" element={<Category />} />
            <Route path="/product" element={<Product />} />
            <Route path="/user" element={<User />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  </>
);
