import { Route, Routes } from "react-router";

// Custom Component imports
import Home from "../pages/Home/Home";
import Error from "../pages/Error/Error";
import ProductList from "../pages/productList/ProductList";
import ProductDetails from "../pages/productDetails/ProductDetails";
import Login from "../pages/Authentication/Login";
import Signup from "../pages/Authentication/SignUp";
import Cart from "../pages/Cart/Cart";

function MainRoutes() {

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/:id" element={<ProductDetails/>} />
            <Route path="/signin" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/cart/:userId" element={<Cart/>} />
            <Route path="*" element={<Error />}/>
        </Routes>
    )
}

export default MainRoutes;