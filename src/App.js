import React, { createContext } from "react";
import Navbar from "./UserComponents/Navbar";
import { Route, Routes, Link } from "react-router-dom";
import Register from "./UserComponents/Register";
import Login from "./UserComponents/Login";
import Signup from "./UserComponents/Signup";
import Home from "./UserComponents/Home";
import Product from "./UserComponents/Product";
import Category from "./UserComponents/Category";
import Cart from "./UserComponents/Cart";
import Logout from "./UserComponents/Logout";
import About from "./UserComponents/About";
import Contact from "./UserComponents/Contact";
import SingleProduct from "./UserComponents/SingleProduct";
import { CartProvider } from "react-use-cart";
import Checkout from "./UserComponents/Checkout";
import Lastpage from "./UserComponents/Lastpage";
import Profile from "./UserComponents/Profile";
const App = () => {
  return (
    <>
      <CartProvider>
        <Navbar />
        <Routes>
          <Route extact path="/" element={<Home />} />
          <Route path="/Product" element={<Product />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/userlogin" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/Category" element={<Category />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/About" element={<About />} />
          <Route path="/checkout" element={<Checkout />} />

          <Route path="/Contact" element={<Contact />} />
          <Route path="/thankyou" element={<Lastpage />} />
          <Route path="/singleproduct/:id" element={<SingleProduct />} />
          <Route path="/Cart" element={<Cart />} />
        </Routes>
      </CartProvider>
    </>
  );
};

export default App;
