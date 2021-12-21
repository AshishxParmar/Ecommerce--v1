import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "react-use-cart";
import { Form } from "react-bootstrap";
import axios from "axios";

const Checkout = () => {
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
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const [orderItems, setOrderItems] = useState([]);

  const [PaymentMethod, setPaymentMethod] = useState("");
  console.log("razor", PaymentMethod);

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const newArr = items.map(
      ({ category, createdAt, id, updatedAt, __v, _id, ...keep }) => keep
    );

    setOrderItems(newArr);

    // eslint-disable-next-line
  }, []);

  const placeOrder = async (
    user,
    orderItems,
    shippingAddress,
    paymentMethod,
    totalPrice,
    paymentResult
  ) => {
    const productBody = {
      user,
      orderItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
      paymentResult,
    };
    try {
      const userToken = JSON.parse(localStorage.getItem("token")).tokens[0]
        .token;

      const headers = {
        Authorization: `Bearer ${userToken && userToken}`,
      };
      await axios.post("/orderdata", productBody, { headers });
      console.log("order placed");
    } catch (err) {
      console.log(err);
    }
  };
  const handlePlaceOrder = () => {
    const userid = JSON.parse(localStorage.getItem("token"))._id;

    if (PaymentMethod === "cod") {
      placeOrder(userid, orderItems, address, PaymentMethod, cartTotal);
      emptyCart();
    } else if (PaymentMethod === "razorpay") {
      console.log("Hello");
      displayRazorpay(cartTotal);
      // emptyCart();
    }
  };

  //Payment Method
  async function displayRazorpay(totalPrice) {
    const onlineProduct = {
      totalPrice,
    };

    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    //console.log("RazorpayData", onlineProduct);
    const { data } = await axios.post("/razorpay", { onlineProduct });
    console.log("RazorpayData", data);

    const userid = JSON.parse(localStorage.getItem("token"))._id;

    const options = {
      key: "rzp_test_Y3MY1kL1YOmNmT", // Enter the Key ID generated from the Dashboard
      amount: Number(totalPrice) * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: data.currency,
      order_id: data.id,
      name: "Shoppers",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: function (response) {
        placeOrder(userid, orderItems, address, PaymentMethod, cartTotal, {
          paymentID: response.razorpay_payment_id,
          orderID: response.razorpay_order_id,
          sign: response.razorpay_signature,
          status: "completed",
        });
        navigate("/thankyou");
      },
      prefill: {
        name: "Gaurav Kumar",
        email: "gaurav.kumar@example.com",
        contact: "9999999999",
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  return (
    <>
      <div className="site-wrap">
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
                    <a href="index.html" className="js-logo-clone">
                      Shoppers
                    </a>
                  </div>
                </div>
                <div className="col-6 col-md-4 order-3 order-md-3 text-right">
                  <div className="site-top-icons">
                    <ul>
                      <li>
                        <a href="#">
                          <span className="icon icon-person" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <span className="icon icon-heart-o" />
                        </a>
                      </li>
                      <li>
                        <a href="cart.html" className="site-cart">
                          <span className="icon icon-shopping_cart" />
                          <span className="count">2</span>
                        </a>
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
                <li className="has-children">
                  <a href="index.html">Home</a>
                  <ul className="dropdown">
                    <li>
                      <a href="#">Menu One</a>
                    </li>
                    <li>
                      <a href="#">Menu Two</a>
                    </li>
                    <li>
                      <a href="#">Menu Three</a>
                    </li>
                    <li className="has-children">
                      <a href="#">Sub Menu</a>
                      <ul className="dropdown">
                        <li>
                          <a href="#">Menu One</a>
                        </li>
                        <li>
                          <a href="#">Menu Two</a>
                        </li>
                        <li>
                          <a href="#">Menu Three</a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li className="has-children">
                  <a href="about.html">About</a>
                  <ul className="dropdown">
                    <li>
                      <a href="#">Menu One</a>
                    </li>
                    <li>
                      <a href="#">Menu Two</a>
                    </li>
                    <li>
                      <a href="#">Menu Three</a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a href="shop.html">Shop</a>
                </li>
                <li>
                  <a href="#">Catalogue</a>
                </li>
                <li>
                  <a href="#">New Arrivals</a>
                </li>
                <li>
                  <a href="contact.html">Contact</a>
                </li>
              </ul>
            </div>
          </nav>
        </header>
        <div className="bg-light py-3">
          <div className="container">
            <div className="row">
              <div className="col-md-12 mb-0">
                <a href="index.html">Home</a>{" "}
                <span className="mx-2 mb-0">/</span>{" "}
                <a href="cart.html">Cart</a>{" "}
                <span className="mx-2 mb-0">/</span>{" "}
                <strong className="text-black">Checkout</strong>
              </div>
            </div>
          </div>
        </div>
        <div className="site-section">
          <div className="container">
            <div className="row">
              <div className="col-md-6 mb-5 mb-md-0">
                <h2 className="h3 mb-3 text-black">Shipping Details</h2>
                <div className="p-3 p-lg-5 border">
                  <div className="form-group row">
                    <div className="col-md-6">
                      <label htmlFor="c_country" className="text-black">
                        Name <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={address.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="c_country" className="text-black">
                        Phone <span className="text-danger">*</span>
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        name="phone"
                        value={address.phone}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <div className="col-md-12">
                      <label htmlFor="c_address" className="text-black">
                        Address <span className="text-danger">*</span>
                      </label>
                      <textarea
                        className="form-control"
                        id="c_address"
                        name="address"
                        cols={30}
                        rows={5}
                        value={address.address}
                        onChange={handleChange}
                        placeholder="Street address"
                      ></textarea>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="c_country" className="text-black">
                      City <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="city"
                      value={address.city}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group row">
                    <div className="col-md-6">
                      <label htmlFor="c_country" className="text-black">
                        Country <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="country"
                        value={address.country}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="c_country" className="text-black">
                        Postal Code <span className="text-danger">*</span>
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        name="postalCode"
                        value={address.postalCode}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="row mb-5">
                  <div className="col-md-12">
                    <h2 className="h3 mb-3 text-black">Your Order</h2>
                    <div className="p-3 p-lg-5 border">
                      <table className="table site-block-order-table mb-5">
                        <thead>
                          <tr>
                            <th>Product</th>
                            <th>Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {items.map((data) => {
                            return (
                              <>
                                <tr>
                                  <td>
                                    {data.name}
                                    <strong className="mx-2">x</strong>{" "}
                                    {data.quantity}
                                  </td>
                                  <td>${data.price}</td>
                                </tr>
                              </>
                            );
                          })}
                          <tr>
                            <td className="text-black font-weight-bold">
                              <strong> </strong>
                            </td>
                            <td className="text-black"></td>
                          </tr>
                          <tr>
                            <td className="text-black font-weight-bold">
                              <strong>Order Total</strong>
                            </td>
                            <td className="text-black font-weight-bold">
                              <strong>${cartTotal}</strong>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <div className="row mb-5">
                        <div className="col-md-12">
                          <h2 className="h3 mb-3 text-black">Coupon Code</h2>
                          <div className="p-3 p-lg-5 border">
                            <label htmlFor="c_code" className="text-black mb-3">
                              Enter your coupon code if you have one
                            </label>
                            <div className="input-group w-75">
                              <input
                                type="text"
                                className="form-control"
                                id="c_code"
                                placeholder="Coupon Code"
                                aria-label="Coupon Code"
                                aria-describedby="button-addon2"
                              />
                              <div className="input-group-append">
                                <button
                                  className="btn btn-primary btn-sm"
                                  type="button"
                                  id="button-addon2"
                                >
                                  Apply
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="border p-3 mb-3">
                        {/* <h3 className="h6 mb-0">
                          <a
                            className="d-block"
                            data-toggle="collapse"
                            href="#collapsebank"
                            role="button"
                            aria-expanded="false"
                            aria-controls="collapsebank"
                          >
                            Direct Bank Transfer
                          </a>
                        </h3> */}
                        <div className="collapse" id="collapsebank">
                          <div className="py-2">
                            <p className="mb-0">
                              Make your payment directly into our bank account.
                              Please use your Order ID as the payment reference.
                              Your order won’t be shipped until the funds have
                              cleared in our account.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="border p-3 mb-3">
                        <div className="form-group my-5">
                          <label className="text-black">
                            Payment Method{" "}
                            <span className="text-danger">*</span>
                          </label>
                          <div className="border p-3 mb-3">
                            <select
                              className="form-control"
                              name="paymentMethod"
                              onChange={(e) => setPaymentMethod(e.target.value)}
                            >
                              <option>Select</option>
                              <option value="razorpay">
                                Pay using RazorPay
                              </option>
                              <option value="cod">Cash On delivery</option>
                            </select>
                          </div>
                          <div className="form-group">
                            {PaymentMethod === "cod" ? (
                              <Link
                                to="/thankyou"
                                className="btn btn-primary btn-lg py-3 btn-block"
                                onClick={handlePlaceOrder}
                              >
                                Place Order
                              </Link>
                            ) : (
                              <button
                                className="btn btn-primary btn-lg py-3 btn-block"
                                onClick={handlePlaceOrder}
                              >
                                RazorPay
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                      {/* <div className="border p-3 mb-5">
                        <h3 className="h6 mb-0">
                          <button
                            className="btn btn-primary"
                            data-toggle="collapse"
                            href="#collapsepaypal"
                            aria-expanded="false"
                            aria-controls="collapsepaypal"
                            onClick={displayRazorpay}
                          >
                            Razorpay
                          </button>
                        </h3>
                        <div className="collapse" id="collapsepaypal">
                          <div className="py-2"></div>
                        </div>
                      </div> */}
                      {/* <div className="form-group">
                        <Link
                          className="btn btn-primary btn-lg py-3 btn-block"
                          to="/thankyou"
                          onClick={handlePlaceOrder}
                        >
                          Place Order
                        </Link>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* </form> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
