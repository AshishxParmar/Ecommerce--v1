import React, { useState, useEffect } from "react";
import { Form, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import Adminnavbar from "./Adminnavbar";
const axios = require("axios");

const Index = () => {
  const [cate, setCate] = useState([]);
  const [order, setOrder] = useState([]);
  const [product, setProduct] = useState({
    name: "",
    sku: "",
    category: "",
    price: "",
    description: "",
  });
  const [category, setCategory] = useState({
    name: "",
  });

  const [file, setFile] = useState([]);
  console.log("product", product);
  console.log("file", file);

  function handleChange(e) {
    const newdata = { ...product };
    newdata[e.target.name] = e.target.value;
    setProduct(newdata);
    console.log(newdata);
  }

  function handleChangee(e) {
    const newdata = { ...category };
    newdata[e.target.name] = e.target.value;
    setCategory(newdata);
    console.log(newdata);
  }

  async function addProduct(e) {
    e.preventDefault();

    const { name, category, description, price, sku } = product;

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("sku", product.sku);
    formData.append("price", product.price);
    formData.append("description", product.description);
    formData.append("category", product.category);
    formData.append("productImage", file);

    const productBody = formData;
    try {
      await axios.post("/productdata", productBody, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (err) {
      console.log(err.message);
    }
  }

  // function addProduct(e) {
  //   e.preventDefault();
  //   axios
  //     .post("/productdata", {
  //       name: product.name,
  //       sku: product.sku,
  //       category: product.category,
  //       price: product.price,
  //       description: product.description,
  //     })
  //     .then((res) => {
  //       console.log(res.product);
  //     });
  // }
  function addCategory(e) {
    e.preventDefault();
    axios
      .post("/categories", {
        name: category.name,
      })
      .then((res) => {
        console.log(res.category);
      });
  }

  const getAllCategory = async () => {
    try {
      const res = await axios.get("/categorydata");
      setCate(res.data);
      console.log("category:", res.data);
    } catch (error) {
      console.log("err:", error);
    }
  };
  const getAllOrders = async () => {
    try {
      const res = await axios.get("/orders");
      setOrder(res.data);
      console.log("orders:", res.data);
    } catch (error) {
      console.log("err:", error);
    }
  };
  useEffect(() => {
    getAllCategory();
    getAllOrders();
  }, []);

  const [oneorder, setOneorder] = useState({
    shippingAddress: {},
    orderItems: [],
    user: {},
  });

  const getUserorder = async (id) => {
    try {
      const { data } = await axios.get(`/getoneorder/${id}`);
      console.log("getoneorder", data);
      setOneorder(data);
    } catch (err) {
      console.log("err:", err.message);
    }
  };
  let x = 1;

  return (
    <div>
      <div>
        <Adminnavbar />
        {/* HEADER */}
        <header id="main-header" className="py-2 bg-primary text-white">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <h1>
                  <i className="fas fa-cog" /> Welcome Admin
                </h1>
              </div>
            </div>
          </div>
        </header>
        {/* ACTIONS */}
        <section id="actions" className="py-4 mb-4 bg-light">
          <div className="container">
            <div className="row">
              <div className="col-md-3">
                <Link
                  to="#"
                  className="btn btn-primary btn-block"
                  data-toggle="modal"
                  data-target="#addProductModal"
                >
                  <i className="fas fa-plus" /> Add Product
                </Link>
              </div>
              <div className="col-md-3">
                <Link
                  to="#"
                  className="btn btn-success btn-block"
                  data-toggle="modal"
                  data-target="#addCategoryModal"
                >
                  <i className="fas fa-plus" /> Add Category
                </Link>
              </div>
              <div className="col-md-3">
                <Link
                  to="#"
                  className="btn btn-warning btn-block"
                  data-toggle="modal"
                  data-target="#addUserModal"
                >
                  <i className="fas fa-plus" /> Add User
                </Link>
              </div>
            </div>
          </div>
        </section>
        {/* POSTS */}
        <section id="posts">
          <div className="container">
            <div className="row">
              <div className="col-md-9">
                <div className="card">
                  <div className="card-header">
                    <h4>Recent Orders</h4>
                  </div>
                  <table className="table table-striped">
                    <thead className="thead-dark">
                      <tr>
                        <th>#</th>
                        <th> Name</th>
                        <th> Price</th>
                        <th> Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.map((data) => {
                        console.log("datas", data);
                        return (
                          <>
                            <tr>
                              <td>{x++}</td>
                              {/* <td>{data.user}</td> */}
                              {/* <td>{data.shippingAddress}</td> */}
                              <td>{data.user.name}</td>
                              <td>{data.totalPrice}</td>
                              <td>{data.createdAt}</td>

                              <td>
                                <Link
                                  to="#"
                                  data-toggle="modal"
                                  data-target="#addPostModal"
                                >
                                  <button
                                    className="btn btn-primary"
                                    onClick={() => getUserorder(data._id)}
                                  >
                                    {" "}
                                    Details
                                  </button>
                                </Link>
                              </td>
                            </tr>
                          </>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card text-center bg-primary text-white mb-3">
                  <div className="card-body">
                    <h3>Product</h3>
                    <h4 className="display-4">
                      <i className="fas fa-pencil-alt" /> 6
                    </h4>

                    <Link
                      to="/productdata"
                      className="btn btn-outline-light btn-sm"
                    >
                      View
                    </Link>
                  </div>
                </div>
                <div className="card text-center bg-success text-white mb-3">
                  <div className="card-body">
                    <h3>Categories</h3>
                    <h4 className="display-4">
                      <i className="fas fa-folder" /> 4
                    </h4>
                    <Link
                      to="/categoriesdata"
                      className="btn btn-outline-light btn-sm"
                    >
                      View
                    </Link>
                  </div>
                </div>
                <div className="card text-center bg-warning text-white mb-3">
                  <div className="card-body">
                    <h3>Users</h3>
                    <h4 className="display-4">
                      <i className="fas fa-users" /> 4
                    </h4>
                    <Link
                      to="users.html"
                      className="btn btn-outline-light btn-sm"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* //======================================================================= */}

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
                              {/* <h5 className="text-muted mb-0">
                                Thanks for your Order,{" "}
                                <span style={{ color: "#a8729a" }}>
                                  {user.name}
                                </span>
                                !
                              </h5> */}
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
                                  Payment Mode :{oneorder.paymentMethod}
                                </p>
                                {/* <p className="text-muted mb-0">
                                  <span className="fw-bold me-4">Discount</span>{" "}
                                  $19.00
                                </p> */}

                                <p className="text-muted mb-0">
                                  <span className="fw-bold me-4">GST 18%</span>{" "}
                                  123
                                </p>
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
                                  Invoice Date : {oneorder.createdAt}
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
        {/* ======================================================================= */}

        {/* FOOTER */}
        <footer id="main-footer" className="bg-dark text-white mt-5 p-5">
          <div className="container">
            <div className="row">
              <div className="col">
                <p className="lead text-center">
                  Copyright ©
                  <span id="year" />
                  Shoppers
                </p>
              </div>
            </div>
          </div>
        </footer>
        {/* MODALS */}
        {/* ADD POST MODAL */}
        <div className="modal fade" id="addProductModal">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">Add Product</h5>
                <button className="close" data-dismiss="modal">
                  <span>×</span>
                </button>
              </div>
              <div className="modal-body">
                <Form onSubmit={(e) => addProduct(e)}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Name"
                      name="name"
                      value={product.name}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Sku</Form.Label>
                    <Form.Control
                      type="String"
                      placeholder="Enter Sku"
                      name="sku"
                      value={product.sku}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Select
                    aria-label="Default select example"
                    name="category"
                    onChange={handleChange}
                  >
                    <option>Category</option>
                    {cate.map((item) => {
                      console.log(item, "items");
                      return <option value={item._id}>{item.name}</option>;
                    })}
                  </Form.Select>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter Price"
                      name="price"
                      value={product.price}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="description"
                      value={product.description}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Upload Image</Form.Label>
                    <Form.Control
                      type="file"
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                  </Form.Group>
                </Form>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-primary"
                  data-dismiss="modal"
                  onClick={addProduct}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* ADD CATEGORY MODAL */}
        <div className="modal fade" id="addCategoryModal">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header bg-success text-white">
                <h5 className="modal-title">Add Category</h5>
                <button className="close" data-dismiss="modal">
                  <span>×</span>
                </button>
              </div>
              <div className="modal-body">
                <Form onSubmit={(e) => addCategory(e)}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Name"
                      name="name"
                      value={category.name}
                      onChange={handleChangee}
                    />
                  </Form.Group>

                  <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Upload Image</Form.Label>
                    <Form.Control type="file" />
                  </Form.Group>
                </Form>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-success"
                  data-dismiss="modal"
                  type="submit"
                  onClick={addCategory}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* ADD USER MODAL */}
        <div className="modal fade" id="addUserModal">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header bg-warning text-white">
                <h5 className="modal-title">Add User</h5>
                <button className="close" data-dismiss="modal">
                  <span>×</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" className="form-control" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password2">Confirm Password</label>
                    <input type="password" className="form-control" />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button className="btn btn-warning" data-dismiss="modal">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
