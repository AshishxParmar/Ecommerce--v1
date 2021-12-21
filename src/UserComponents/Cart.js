import axios from "axios";
import React from "react";
import { useNavigate } from "react-router";

import { useCart } from "react-use-cart";
import { Link } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("token"));
  const {
    isEmpty,
    totalItems,
    totalUniqueItems,
    cartTotal,
    updateItemQuantity,
    removeItem,
    emptyCart,
    items,
  } = useCart();
  if (isEmpty)
    return (
      <center>
        <h1>Your cart is empty</h1>
      </center>
    );
  let pro = items[0];

  return (
    <div className="site-wrap">
      <div className="bg-light py-3">
        <div className="container">
          <div className="row">
            <div className="col-md-12 mb-0">
              <a href="index.html">Home</a> <span className="mx-2 mb-0">/</span>{" "}
              <strong className="text-black">
                Cart({totalUniqueItems}) total Items:({totalItems})
              </strong>
            </div>
          </div>
        </div>
      </div>
      <div className="site-section">
        <div className="container">
          <div className="row mb-5">
            <form className="col-md-12" method="post">
              <div className="site-blocks-table">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th className="product-thumbnail">Image</th>
                      <th className="product-name">Product</th>
                      <th className="product-price">Price</th>
                      <th className="product-quantity">Quantity</th>
                      <th className="product-total">Total</th>
                      <th className="product-remove">Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((data) => {
                      return (
                        <>
                          <tr>
                            <td className="product-thumbnail">
                              <img
                                src={data.productImage}
                                alt="Image"
                                className="img-fluid"
                              />
                            </td>
                            <td className="product-name">
                              <h2 className="h5 text-black">{data.name}</h2>
                            </td>
                            <td>${data.price}</td>
                            <td>
                              <div
                                className="input-group mb-3"
                                style={{ maxWidth: "120px" }}
                              >
                                {/* <div className="input-group-prepend">
                            <button
                              className="btn btn-outline-primary js-btn-minus"
                              type="button"
                            >
                              −
                            </button>
                          </div> */}
                                <button
                                  className="btn btn-outline-primary js-btn-plus"
                                  type="button"
                                  onClick={() =>
                                    updateItemQuantity(
                                      data.id,
                                      data.quantity - 1
                                    )
                                  }
                                >
                                  -
                                </button>
                                <input
                                  type="string"
                                  value={data.quantity}
                                  className="form-control text-center"
                                  placeholder
                                  aria-label="Example text with button addon"
                                  aria-describedby="button-addon1"
                                />

                                <div className="input-group-append">
                                  <button
                                    className="btn btn-outline-primary js-btn-plus"
                                    type="button"
                                    onClick={() =>
                                      updateItemQuantity(
                                        data.id,
                                        data.quantity + 1
                                      )
                                    }
                                  >
                                    +
                                  </button>
                                </div>
                              </div>
                            </td>
                            <td>${data.price}</td>
                            <td>
                              <button
                                type="button"
                                className="btn btn-danger btn-sm"
                                onClick={() => removeItem(data.id)}
                              >
                                X
                              </button>
                            </td>
                          </tr>
                        </>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </form>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="row mb-5">
                {/* <div className="col-md-6 mb-3 mb-md-0">
                  <Link
                    to="/Product"
                    className="btn btn-primary btn-sm btn-block"
                  >
                    Update Cart
                  </Link>
                </div> */}
                <div className="col-md-6">
                  <Link
                    className="btn btn-outline-primary btn-sm btn-block"
                    to="/Product"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <label className="text-black h4" htmlFor="coupon">
                    Coupon
                  </label>
                  <p>Enter your coupon code if you have one.</p>
                </div>
                <div className="col-md-8 mb-3 mb-md-0">
                  <input
                    type="text"
                    className="form-control py-3"
                    id="coupon"
                    placeholder="Coupon Code"
                  />
                </div>
                <div className="col-md-4">
                  <button className="btn btn-primary btn-sm">
                    Apply Coupon
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-6 pl-5">
              <div className="row justify-content-end">
                <div className="col-md-7">
                  <div className="row">
                    <div className="col-md-12 text-right border-bottom mb-5">
                      <h3 className="text-black h4 text-uppercase">
                        Cart Totals
                      </h3>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-6 text-right">
                      <strong className="text-black"></strong>
                    </div>
                  </div>
                  <div className="row mb-5">
                    <div className="col-md-6">
                      <span className="text-black">Total</span>
                    </div>
                    <div className="col-md-6 text-right">
                      <strong className="text-black">${cartTotal}</strong>
                    </div>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => emptyCart(pro.id)}
                    >
                      Clear Cart
                    </button>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <button
                        className="btn btn-primary btn-lg py-3 btn-block"
                        onClick={() =>
                          navigate(user ? "/checkout" : "/userlogin")
                        }
                      >
                        Proceed To Checkout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="site-footer border-top">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <div className="row">
                <div className="col-md-12">
                  <h3 className="footer-heading mb-4">Navigations</h3>
                </div>
                <div className="col-md-6 col-lg-4">
                  <ul className="list-unstyled">
                    <li>
                      <a href="#">Sell online</a>
                    </li>
                    <li>
                      <a href="#">Features</a>
                    </li>
                    <li>
                      <a href="#">Shopping cart</a>
                    </li>
                    <li>
                      <a href="#">Store builder</a>
                    </li>
                  </ul>
                </div>
                <div className="col-md-6 col-lg-4">
                  <ul className="list-unstyled">
                    <li>
                      <a href="#">Mobile commerce</a>
                    </li>
                    <li>
                      <a href="#">Dropshipping</a>
                    </li>
                    <li>
                      <a href="#">Website development</a>
                    </li>
                  </ul>
                </div>
                <div className="col-md-6 col-lg-4">
                  <ul className="list-unstyled">
                    <li>
                      <a href="#">Point of sale</a>
                    </li>
                    <li>
                      <a href="#">Hardware</a>
                    </li>
                    <li>
                      <a href="#">Software</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-3 mb-4 mb-lg-0">
              <h3 className="footer-heading mb-4">Promo</h3>
              <a href="#" className="block-6">
                <img
                  src="images/hero_1.jpg"
                  alt="Image placeholder"
                  className="img-fluid rounded mb-4"
                />
                <h3 className="font-weight-light  mb-0">
                  Finding Your Perfect Shoes
                </h3>
                <p>Promo from nuary 15 — 25, 2019</p>
              </a>
            </div>
            <div className="col-md-6 col-lg-3">
              <div className="block-5 mb-5">
                <h3 className="footer-heading mb-4">Contact Info</h3>
                <ul className="list-unstyled">
                  <li className="address">
                    203 Fake St. Mountain View, San Francisco, California, USA
                  </li>
                  <li className="phone">
                    <a href="tel://23923929210">+2 392 3929 210</a>
                  </li>
                  <li className="email">emailaddress@domain.com</li>
                </ul>
              </div>
              <div className="block-7">
                <form action="#" method="post">
                  <label htmlFor="email_subscribe" className="footer-heading">
                    Subscribe
                  </label>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control py-4"
                      id="email_subscribe"
                      placeholder="Email"
                    />
                    <input
                      type="submit"
                      className="btn btn-sm btn-primary"
                      defaultValue="Send"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="row pt-5 mt-5 text-center">
            <div className="col-md-12">
              <p>
                {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
                Copyright © All rights reserved | This template is made with{" "}
                <i className="icon-heart" aria-hidden="true" /> by{" "}
                <a
                  href="https://colorlib.com"
                  target="_blank"
                  className="text-primary"
                >
                  Colorlib
                </a>
                {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Cart;
