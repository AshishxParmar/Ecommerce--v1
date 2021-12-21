import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Link, NavLink } from "react-router-dom";
import AdminLogin from "../AdminComponents/AdminLogin";
import { Route, Routes } from "react-router-dom";
import Index from "../AdminComponents/Index";
import Product from "../AdminComponents/Product";
import Category from "../AdminComponents/Categories";

import Users from "../AdminComponents/Users";
import {
  FcBusinessman,
  FcLock,
  FcKey,
  FcReadingEbook,
  FcContacts,
} from "react-icons/fc";
import { BiCart } from "react-icons/bi";
import { useCart } from "react-use-cart";

const Navbar = () => {
  const { totalUniqueItems } = useCart();

  const [userInfo, setUserInfo] = useState(null);
  useEffect(() => {
    setUserInfo(JSON.parse(localStorage.getItem("token") || null));
  }, []);

  return (
    <>
      <Routes>
        <Route extact path="/AdminLogin" element={<AdminLogin />}></Route>
        <Route extact path="/index" element={<Index />}></Route>
        <Route extact path="/productdata" element={<Product />}></Route>
        <Route extact path="/categoriesdata" element={<Category />}></Route>
        <Route extact path="/users" element={<Users />} />
      </Routes>
      <header className="site-navbar" role="banner">
        <div className="site-navbar-top">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-6 col-md-4 order-2 order-md-1 site-search-icon text-left">
                <form action className="site-block-top-search">
                  <span className="icon icon-search2" />
                  <input
                    type="text"
                    className="form-control border-0"
                    placeholder="Search"
                  />
                </form>
              </div>
              <div className="col-12 mb-3 mb-md-0 col-md-4 order-1 order-md-2 text-center">
                <div className="site-logo">
                  <NavLink to="/" className="js-logo-clone">
                    Shoppers
                  </NavLink>
                </div>
              </div>
              <div className="col-6 col-md-4 order-3 order-md-3 text-right">
                <div className="site-top-icons">
                  <ul>
                    <li>
                      {" "}
                      <Link to="/signup">
                        <FcContacts />
                      </Link>
                    </li>
                    <li>
                      {" "}
                      <Link to="/userlogin">
                        <FcKey />
                      </Link>
                    </li>
                    <li>
                      {" "}
                      <Link to="/index">
                        <FcReadingEbook />
                      </Link>
                    </li>
                    <li>
                      {userInfo && (
                        <>
                          <Link
                            onClick={() => {
                              localStorage.removeItem("token");
                              setUserInfo(null);
                            }}
                            to="/logout"
                          >
                            <FcLock />
                          </Link>
                          <li>
                            <Link to="/profile">
                              <FcBusinessman />
                            </Link>
                          </li>
                        </>
                      )}
                    </li>

                    <li>
                      <Link to="/cart" className="site-cart">
                        <BiCart />
                        <span className="count">{totalUniqueItems}</span>
                      </Link>
                    </li>

                    <li className="d-inline-block d-md-none ml-md-0">
                      <a href="#" className="site-menu-toggle js-menu-toggle">
                        <span className="icon-menu" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <nav
          className="site-navigation text-right text-md-center"
          role="navigation"
        >
          <div className="container">
            <ul className="site-menu js-clone-nav d-none d-md-block">
              <li className="has-children active">
                <NavLink to="/">Home</NavLink>
                <ul className="dropdown">
                  <li>
                    <a href="#">Menu One</a>
                  </li>
                </ul>
              </li>
              <li className="has-children">
                <NavLink to="/About">About</NavLink>
              </li>
              <li>
                <NavLink to="/Product">Shop</NavLink>
              </li>
              <li>
                <a href="#">Catalogue</a>
              </li>
              <li>
                <a href="#">New Arrivals</a>
              </li>
              <li>
                <NavLink to="/Contact">Contact</NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
