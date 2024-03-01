import { Route, Routes } from "react-router-dom";
import Login from "../../../auth/login";
import Register from "../../../auth/register";
import ProductPage from "../../page/Product";
import ContactPage from "../../page/Contact";
import HomeClient from "../../Home";
import App from "../../../../App";

function ClientRoutes() {
  return (
    <Routes >
        <Route path="/" element={< App />} />
        <Route path="/home" element={< HomeClient />} />
        <Route path="/login" element={< Login setToken={null} />} />
        <Route path="/register" element={< Register setToken={null} />} />
        <Route path="/menu" element={< ProductPage />} />
        <Route path="/contact" element={< ContactPage />} />
    </Routes>
  )
} 

export default ClientRoutes;