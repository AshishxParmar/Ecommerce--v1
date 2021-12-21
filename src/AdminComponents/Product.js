import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink, Form } from "react-bootstrap";
import Button from "@restart/ui/esm/Button";
import Adminnavbar from "./Adminnavbar";

const Product = (props) => {
  const [skip, setSkip] = useState(0);
  const [keyword, setkeyword] = useState("");

  const [totalResults, setTotalResults] = useState(0);
  const limit = 50;

  const [prostate, setProstate] = useState([]);
  const [product, setProduct] = useState({
    name: "",
    sku: "",
    category: "",
    price: "",
    description: "",
  });
  console.log("prostate", prostate);
  console.log("product", product);

  function handleChange(e) {
    setProduct({ ...product, [e.target.name]: e.target.value });
  }

  const getProducts = async (limit, skip, keyword) => {
    try {
      const res = await axios.get(`/products`, {
        params: { limit, skip, keyword },
      });
      const data = res.data;
      console.log("data:", data);
      setProstate(data.products);
    } catch (error) {
      console.log("err:", error);
    }
  };

  function getproduct(_id) {
    axios.get(`/products/${_id}`).then((res) => {
      const prod = res.data;
      setProduct(prod);
      setImage(prod.productImage);
      console.log("product get");
    });
  }
  function delproduct(_id) {
    axios.delete(`/products/${_id}`).then((res) => {
      window.alert("product deleted");
      getProducts(limit, skip, keyword);
    });
  }
  function updateproduct(id) {
    axios.patch(`/products/${id}`, product).then((res) => {
      window.alert("product updated");
      getProducts();
    });
  }

  const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState("");
  const formData = new FormData();
  // formData.append("productImage", imageFile);

  async function updateImage(id, formData) {
    try {
      const { data } = await axios.patch(`/updateimage/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      window.alert("update image data");
      return data.image;
    } catch (err) {
      console.log(err.message);
    }
  }

  const handleUpdateImage = async (id) => {
    const formData = new FormData();
    formData.append("produtImage", imageFile);

    console.log("Add product to run");
    const imagePath = await updateImage(product._id, formData);
    console.log("imagePath", imagePath);
    setImage(imagePath);

    window.alert("update image data");

    setImageFile(null);
  };

  // function updateImage(id) {
  //   axios.patch(`/updateimage/${id}`,formdata).then((res) => {
  //     console.log("image updated");
  //     getProducts();
  //   });
  // }

  // useEffect(() => {
  //   getProducts();
  //   setImage(product.productImage);
  // }, []);
  useEffect(() => {
    const populateProducts = async () => {
      setTotalResults(await getProducts(limit, skip, keyword));
    };
    populateProducts();
    getProducts();
    setImage(product.productImage);
  }, [limit, skip, keyword]);

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
                  <i className="fas fa-pencil-alt" /> Products
                </h1>
              </div>
            </div>
          </div>
        </header>
        {/* SEARCH */}
        <section id="search" className="py-4 mb-4 bg-light">
          <div className="container">
            <div className="row">
              <div className="col-md-6 ml-auto">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search Posts..."
                  />
                  <div className="input-group-append">
                    <button className="btn btn-primary">Search</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* POSTS */}

        <section id="posts">
          <div className="container">
            <div className="row">
              <div className="col">
                <div className="card">
                  <div className="card-header">
                    <h4>All Products</h4>
                  </div>

                  <table className="table table-striped">
                    <thead className="thead-dark">
                      <tr>
                        <th>#</th>
                        <th> Name</th>
                        <th>Sku</th>
                        <th>ItemID</th>
                        <th> Price</th>
                        <th>Description</th>
                        {/* <th>Image</th> */}
                        <th> </th>
                      </tr>
                    </thead>

                    {prostate.map((item) => {
                      return (
                        <>
                          <tbody>
                            <tr>
                              <td>{x++}</td>
                              <td>{item.name}</td>
                              <td>{item.sku}</td>
                              <td>{item._id}</td>
                              <td>{item.price}</td>

                              <td>{item.description}</td>

                              <td>
                                <Button
                                  className="btn btn-primary"
                                  onClick={() => delproduct(item._id)}
                                >
                                  Delete
                                </Button>

                                <a
                                  to="#"
                                  className="btn btn-secondary"
                                  data-toggle="modal"
                                  data-target="#addPostModal"
                                  onClick={() => getproduct(item._id)}
                                >
                                  Update
                                </a>
                                {/* <a href="details.html" className="btn btn-secondary">
                                                                    <i className="fas fa-angle-double-right" /> Details
                                                                </a> */}
                              </td>
                            </tr>
                          </tbody>
                        </>
                      );
                    })}
                  </table>

                  <div className="modal fade" id="addPostModal">
                    <div className="modal-dialog modal-lg">
                      <div className="modal-content">
                        <div className="modal-header bg-primary text-white">
                          <h5 className="modal-title">Update Product</h5>
                          <button className="close" data-dismiss="modal">
                            <span>×</span>
                          </button>
                        </div>
                        <div className="modal-body">
                          <Form>
                            <img src={image} />
                            <Form.Group
                              className="mb-3"
                              controlId="formBasicEmail"
                            >
                              <Form.Label>Name</Form.Label>
                              <Form.Control
                                type="text"
                                placeholder="Enter Name"
                                name="name"
                                value={product.name}
                                onChange={handleChange}
                              />
                            </Form.Group>
                            <Form.Group
                              className="mb-3"
                              controlId="formBasicEmail"
                            >
                              <Form.Label>Sku</Form.Label>
                              <Form.Control
                                type="String"
                                placeholder="Enter Sku"
                                name="sku"
                                value={product.sku}
                                onChange={handleChange}
                              />
                            </Form.Group>
                            {/* <Form.Group
                              className="mb-3"
                              controlId="formBasicEmail"
                            >
                              <Form.Label>Category</Form.Label>
                              <Form.Control
                                type="text"
                                placeholder="Enter Category"
                                name="category"
                                value={product.category}
                                onChange={handleChange}
                              />
                            </Form.Group> */}
                            <Form.Group
                              className="mb-3"
                              controlId="formBasicEmail"
                            >
                              <Form.Label>Price</Form.Label>
                              <Form.Control
                                type="number"
                                placeholder={product.price}
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
                                name="productImage"
                                type="file"
                                onChange={(e) =>
                                  setImageFile(e.target.files[0])
                                }
                              />
                              <button
                                className="btn btn-primary"
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleUpdateImage();
                                }}
                              >
                                Update Image
                              </button>
                            </Form.Group>
                          </Form>
                        </div>

                        <div className="modal-footer">
                          <button
                            className="btn btn-primary"
                            data-dismiss="modal"
                            onClick={() => updateproduct(product._id)}
                          >
                            Update
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* PAGINATION */}
                  <nav className="ml-4">
                    <ul className="pagination">
                      <li className="page-item disabled">
                        <a href="#" className="page-link">
                          Previous
                        </a>
                      </li>
                      <li className="page-item active">
                        <a href="#" className="page-link">
                          1
                        </a>
                      </li>
                      <li className="page-item">
                        <a href="#" className="page-link">
                          2
                        </a>
                      </li>
                      <li className="page-item">
                        <a href="#" className="page-link">
                          3
                        </a>
                      </li>
                      <li className="page-item">
                        <a href="#" className="page-link">
                          Next
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer id="main-footer" className="bg-dark text-white mt-5 p-5">
          <div className="container">
            <div className="row">
              <div className="col">
                <p className="lead text-center">
                  Copyright ©
                  <span id="year" />
                  Blogen
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Product;
