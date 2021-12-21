import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState("");
  const [userorder, setUserorder] = useState([]);

  const [oneorder, setOneorder] = useState({
    shippingAddress: {},
    orderItems: [],
    paymentResult: {},
    user: {},
  });

  const id = JSON.parse(localStorage.getItem("token"))._id;

  async function updateuser(id) {
    try {
      const { data } = await axios.patch(`/users/${id}`, user);

      setUser(data.user);
      window.alert("User Updated");
    } catch (err) {
      console.log(err.response.data.error);
    }
  }

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }
  const getUser = async (id) => {
    try {
      const { data } = await axios.get(`/users/${id}`);
      console.log(data);
      setUser(data);
    } catch (err) {
      console.log("err:", err.message);
    }
  };

  function handleSave(e) {
    e.preventDefault();
    updateuser(id);
    getUser(id);
  }

  const getAllOrders = async () => {
    try {
      const userToken = JSON.parse(localStorage.getItem("token")).tokens[0]
        .token;

      const headers = {
        Authorization: `Bearer ${userToken && userToken}`,
      };
      const res = await axios.get("/getmyorder", { headers });
      setUserorder(res.data);
      console.log("setUserorder", res.data);
    } catch (error) {
      console.log("err:", error);
    }
  };

  const getUserorder = async (id) => {
    try {
      const { data } = await axios.get(`/getoneorder/${id}`);
      console.log("getoneorder", data);
      setOneorder(data);
    } catch (err) {
      console.log("err:", err.message);
    }
  };

  useEffect(() => {
    getUser(id);
    getAllOrders();
  }, []);
  return (
    <>
      <div>
        <form onSubmit={handleSave}>
          {/* ACTIONS */}
          <section id="actions" className="py-4 mb-4 bg-light">
            <div className="container">
              <div className="row">
                <div className="col-md-3">
                  <Link to="/" className="btn btn-light btn-block">
                    <i className="fas fa-arrow-left" /> Home
                  </Link>
                </div>
                <div className="col-md-3">
                  <button type="submit" className="btn btn-success btn-block">
                    Update
                  </button>
                </div>
                <div className="col-md-3">
                  <button className="btn btn-danger btn-block">
                    <i className="fas fa-trash" /> Delete Account
                  </button>
                </div>
              </div>
            </div>
          </section>
          {/* PROFILE */}
          <section id="profile">
            <div className="container">
              <div className="row">
                <div className="col-md-9">
                  <div className="card">
                    <div className="card-header">
                      <h4>Edit Profile</h4>
                    </div>
                    <div className="card-body">
                      <form>
                        <div className="form-group">
                          <label htmlFor="name">Name</label>
                          <input
                            name="name"
                            value={user.name}
                            onChange={handleChange}
                            type="text"
                            className="form-control"
                            placeholder="Brad Traversy"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="email">Email</label>
                          <input
                            name="email"
                            type="email"
                            value={user.email}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="test@test.com"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="email">Password</label>
                          <input
                            type="Password"
                            className="form-control"
                            placeholder="Password"
                          />
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <h3>Your Avatar</h3>
                  <img
                    src="https://picsum.photos/id/1/200/250"
                    alt=""
                    className="d-block img-fluid mb-3"
                  />
                  <button className="btn btn-primary btn-block">
                    Edit Image
                  </button>
                  <button className="btn btn-danger btn-block">
                    Delete Image
                  </button>
                </div>
                <div className="col-md-12">
                  <div className="card">
                    <div className="card-header">
                      <h4>My Orders</h4>
                    </div>
                    <table className="table table-striped">
                      <thead className="thead-dark">
                        <tr>
                          <th>Order Id</th>
                          <th>Order Items</th>
                          <th>Order Price</th>
                          <th>Order Date</th>
                          <th />
                        </tr>
                      </thead>
                      <tbody>
                        {userorder.length > 0 ? (
                          userorder.map((order) => (
                            <tr key={order._id}>
                              <td>{order._id}</td>
                              <td>{order.orderItems.length} item(s)</td>
                              <td>{order.totalPrice}</td>
                              <td>
                                {new Date(order.createdAt).toLocaleDateString()}
                              </td>
                              <td>
                                <Link
                                  to="#"
                                  data-toggle="modal"
                                  data-target="#addPostModal"
                                >
                                  <button
                                    className="btn btn-primary"
                                    onClick={() => getUserorder(order._id)}
                                  >
                                    {" "}
                                    See Detail
                                  </button>
                                </Link>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={4}>
                              <h3 className="text-center">
                                You have no orders yet{" "}
                              </h3>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </form>
        {/* ********************************************************* */}
        <div className="modal fade" id="addPostModal">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">Order Details</h5>
                <button className="close" data-dismiss="modal">
                  <span>×</span>
                </button>
              </div>
              <div className="modal-body">
                <div>
                  <section className="h-100 gradient-custom">
                    <div className="container py-5 h-100">
                      <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-lg-10 col-xl-8">
                          <div
                            className="card"
                            style={{ borderRadius: "10px" }}
                          >
                            <div className="card-header px-4 py-5">
                              <h5 className="text-muted mb-0">
                                Thanks for your Order,{" "}
                                <span style={{ color: "#a8729a" }}>
                                  {user.name}
                                </span>
                                !
                              </h5>
                            </div>
                            <div className="card-body p-4">
                              <div className="d-flex justify-content-between align-items-center mb-4">
                                <p
                                  className="lead fw-normal mb-0"
                                  style={{ color: "#a8729a" }}
                                >
                                  Receipt
                                </p>
                                <p className="small text-muted mb-0">
                                  Receipt Voucher : 1KAU9-84UIL
                                </p>
                              </div>

                              {/* -------------------------------------------------------------------------------------------------------------- */}

                              {oneorder.orderItems.map((item) => {
                                console.log("item", item);
                                return (
                                  <>
                                    <div className="card shadow-0 border mb-4">
                                      <div className="card-body">
                                        <div className="row">
                                          <div className="col-md-2">
                                            <img
                                              src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/13.jpg"
                                              className="img-fluid"
                                              alt="Phone"
                                            />
                                          </div>
                                          {/* <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                                            <p className="text-muted mb-0">
                                              {item.name}
                                            </p>
                                          </div> */}
                                          <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                                            <p className="text-muted mb-0 small">
                                              {item.name}
                                            </p>
                                          </div>
                                          <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                                            <p className="text-muted mb-0 small">
                                              {item.description}
                                            </p>
                                          </div>
                                          <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                                            <p className="text-muted mb-0 small">
                                              {item.quantity}
                                            </p>
                                          </div>
                                          <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                                            <p className="text-muted mb-0 small">
                                              ${item.price}
                                            </p>
                                          </div>
                                        </div>
                                        <hr
                                          className="mb-4"
                                          style={{
                                            backgroundColor: "#e0e0e0",
                                            opacity: 1,
                                          }}
                                        />
                                        <div className="row d-flex align-items-center">
                                          <div className="col-md-2">
                                            <p className="text-muted mb-0 small">
                                              Track Order
                                            </p>
                                          </div>
                                          <div className="col-md-10">
                                            <div
                                              className="progress"
                                              style={{
                                                height: "6px",
                                                borderRadius: "16px",
                                              }}
                                            >
                                              <div
                                                className="progress-bar"
                                                role="progressbar"
                                                style={{
                                                  width: "65%",
                                                  borderRadius: "16px",
                                                  backgroundColor: "#a8729a",
                                                }}
                                                aria-valuenow={65}
                                                aria-valuemin={0}
                                                aria-valuemax={100}
                                              />
                                            </div>
                                            <div className="d-flex justify-content-around mb-1">
                                              <p className="text-muted mt-1 mb-0 small ms-xl-5">
                                                Out for delivary
                                              </p>
                                              <p className="text-muted mt-1 mb-0 small ms-xl-5">
                                                Delivered
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                );
                              })}

                              {/* ------------------------------------------------------------------------------------------------------------ */}

                              <div className="d-flex justify-content-between pt-2">
                                <p className="fw-bold mb-0">Shipping Details</p>
                                <p className="text-muted mb-0">
                                  <span className="fw-bold me-4">Total</span>{" "}
                                  {oneorder.totalPrice}
                                </p>
                              </div>
                              <div className="d-flex justify-content-between">
                                <p className="text-muted mb-0">
                                  <span className="fw-bold me-4">
                                    Payment Method
                                  </span>{" "}
                                  {oneorder.paymentMethod}
                                </p>
                                <p className="text-muted mb-0">
                                  <span className="fw-bold me-4">
                                    Payment Status
                                  </span>{" "}
                                  {oneorder.paymentResult.status}
                                </p>
                                {oneorder.paymentMethod === "razorpay" && (
                                  <p>
                                    <span className="fw-bold me-4">
                                      Payment ID
                                    </span>{" "}
                                    {oneorder.paymentResult.paymentID}
                                  </p>
                                )}

                                {/* <p className="text-muted mb-0">
                                  <span className="fw-bold me-4">GST 18%</span>{" "}
                                  123
                                </p> */}
                              </div>

                              <div className="d-flex justify-content-between">
                                <p className="text-muted mb-0">
                                  Address :{oneorder.shippingAddress.address}
                                  <br />
                                  Phone :{oneorder.shippingAddress.phone}
                                  <br />
                                  City :{oneorder.shippingAddress.city}
                                </p>
                              </div>

                              <div className="d-flex justify-content-between">
                                <p className="text-muted mb-0">
                                  Order Date :{" "}
                                  {new Date(
                                    oneorder.createdAt
                                  ).toLocaleDateString()}
                                </p>
                              </div>
                            </div>

                            <div
                              className="card-footer border-0 px-4 py-5"
                              style={{
                                backgroundColor: "#a8729a",
                                borderBottomLeftRadius: "10px",
                                borderBottomRightRadius: "10px",
                              }}
                            >
                              <h5 className="d-flex align-items-center justify-content-end text-white text-uppercase mb-0">
                                Total paid:{" "}
                                <span className="h2 mb-0 ms-2">
                                  ${oneorder.totalPrice}
                                </span>
                              </h5>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ********************************************************* */}
        {/* FOOTER */}
        <footer id="main-footer" className="bg-dark text-white mt-5 p-5">
          <div className="container">
            <div className="row">
              <div className="col">
                <p className="lead text-center">
                  Copyright ©
                  <span id="year" />
                  Vkaps
                </p>
              </div>
            </div>
          </div>
        </footer>
        {/* MODALS */}
      </div>
    </>
  );
};

export default Profile;
