import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeAdmin from "./pages/admin/Home";
import Login from './pages/auth/Login';
import Register from "./pages/auth/Register";
import HomeClient from "./pages/client/HomeClient";


  function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeClient  />} />
        <Route path="admin" element = {<HomeAdmin  />}/>
        <Route path="login" element={<Login  />} />
        <Route path="register" element={<Register  />} />
        
      </Routes>
    </BrowserRouter>
  );
        };


export default App;