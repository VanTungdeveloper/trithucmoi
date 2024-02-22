import { Route, Router, Routes } from "react-router-dom";
import HomeAdmin from "./pages/admin/Home";
import Login from "./pages/auth/Login";
import HomeClient from "./pages/client/HomeClient";
import { useState } from "react";
import useToken from "./hooks/UseToken";
import Register from "./pages/auth/Register";

function App() {
  const {token, saveToken } = useToken();

  if (!token) {
    return <Login setToken={saveToken} />;
  } else {
  }

  return (
    <Routes>
      <Route path="/" element={<HomeClient />} />
      <Route path="/home" element={<HomeClient />} />
      {/* <Route path="/register" element={<Register setToken={null} />} /> */}
      {/* <Route path="/login" element={<Login setToken={null} />} /> */}
      <Route path="/admin" element={<HomeAdmin />} />
    </Routes>
  );
}

export default App;
