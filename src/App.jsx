import "./App.css";

import { Route, Routes } from "react-router-dom";
import Users from "./Pages/Dashboard/Users/Users";
import User from "./Pages/Dashboard/Users/User";
import AddUser from "./Pages/Dashboard/Users/AddUser";
import Writter from "./Pages/Dashboard/Writter";
import RequireAuth from "./Pages/Auth/Protecting/RequireAuth";
import Err404 from "./Pages/Auth/Errors/404";
import RequireBack from "./Pages/Auth/Protecting/RequireBack";
import Categories from "./Pages/Dashboard/Category/Categories";
import AddCategory from "./Pages/Dashboard/Category/AddCategory";
import Category from "./Pages/Dashboard/Category/Category";
import Products from "./Pages/Dashboard/Product/Products";
import AddProduct from "./Pages/Dashboard/Product/AddProduct";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Register from "./Pages/Auth/AuthOperations/Register";
import Login from "./Pages/Auth/AuthOperations/Login";
import GoogleCallBack from "./Pages/Auth/AuthOperations/GoogleCallBack";
import UpdateProduct from "./Pages/Dashboard/Product/Product";
import HomePage from "./Pages/Website/HomePage/HomePage";
import WibSiteCategories from "./Pages/Website/Categories/Categories";
import WebSite from "./Pages/Website/WebSite";
import SingleProduct from "./Pages/Website/SingleProduct/SingleProduct";

function App() {
  return (
    <Routes>
      {/* Public Route */}
      <Route element={<WebSite />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/categories" element={<WibSiteCategories />} />
        <Route path="/product/:id" element={<SingleProduct />} />

        <Route element={<RequireBack />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Route>
      <Route path="auth/google/callback" element={<GoogleCallBack />} />
      <Route path="/*" element={<Err404 />} />

      {/* Protected Route */}
      <Route element={<RequireAuth allowedRole={["1995", "1996", "1999"]} />}>
        <Route path="/dashboard" element={<Dashboard />}>
          <Route element={<RequireAuth allowedRole={["1995"]} />}>
            <Route path="users" element={<Users />} />
            <Route path="users/:id" element={<User />} />
            <Route path="user/add" element={<AddUser />} />
          </Route>
          <Route element={<RequireAuth allowedRole={["1999", "1995"]} />}>
            {/* Categories */}
            <Route path="categories" element={<Categories />} />
            <Route path="categories/:id" element={<Category />} />
            <Route path="category/add" element={<AddCategory />} />
            {/* Products */}
            <Route path="products" element={<Products />} />
            <Route path="products/:id" element={<UpdateProduct />} />
            <Route path="product/add" element={<AddProduct />} />
          </Route>
          <Route element={<RequireAuth allowedRole={["1996", "1995"]} />}>
            <Route path="writer" element={<Writter />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
