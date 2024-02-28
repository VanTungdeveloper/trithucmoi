import { Route, Routes } from "react-router-dom";
import Dashboard from "../../Pages/Dashboard";
import Category from "../../Pages/Categories/index.jsx";
import AddCategory from "../../Pages/Categories/add.jsx";
import UpdateCategory from "../../Pages/Categories/update.jsx";
import Product from "../../Pages/Products";
import AddProduct from "../../Pages/Products/add.jsx";
import UpdateProduct from "../../Pages/Products/update.jsx";
import User from "../../Pages/Users";


function AdminRoutes() {
    return (
            <Routes>
                <Route path="admin/dashboard" element={< Dashboard/>}></Route>
                <Route path="admin/category" element={< Category/>} ></Route>
                <Route path="admin/category/add" element={< AddCategory/>} ></Route>
                <Route path="admin/category/:id" element={< UpdateCategory />} />
                <Route path="admin/product" element={< Product/>} ></Route>
                <Route path="admin/product/add" element={< AddProduct/>} ></Route>
                <Route path="admin/product/:id" element={< UpdateProduct />} />
                <Route path="admin/user" element={< User/>} ></Route>
            </Routes>          
    )
}

export default AdminRoutes;