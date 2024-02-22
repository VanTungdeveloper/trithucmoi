import { createBrowserRouter } from "react-router-dom";
import HomeClient from "../pages/client/HomeClient";
import HomeAdmin from "../pages/admin/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

const router = createBrowserRouter([
    {
        element: <HomeClient />,
        path: "/",
      },
    {
      element: <HomeClient />,
      path: "/home",
    },
    {
        element: <HomeAdmin />,
        path: "/admin",
    }
    

  
  ]);