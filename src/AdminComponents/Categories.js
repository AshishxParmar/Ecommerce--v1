import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink, Form } from "react-bootstrap";
import Adminnavbar from "./Adminnavbar";

const Categories = () => {
  const [catstate, setCatstate] = useState([]);

  function getCategory() {
    axios.get("/categorydata").then((res) => {
      const data = res.data;

      setCatstate(data);
    });
  }
  useEffect(() => {
    getCategory();
  }, []);

  function delcategory(_id) {
    axios.delete(`/categorydata/${_id}`).then((res) => {
      console.log("category deleted");
      getCategory();
    });
  }

  let x = 1;

  return (
    <div>
      <Adminnavbar />
      {/* HEADER */}
      <header id="main-header" className="py-2 bg-success text-white">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h1>
                <i className="fas fa-folder" /> Categories
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
                  placeholder="Search Categories..."
                />
                <div className="input-group-append">
                  <button className="btn btn-success">Search</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* CATEGORIES */}
      <section id="categories">
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="card">
                <div className="card-header">
                  <h4>Latest Categories</h4>
                </div>
                <table className="table table-striped">
                  <thead className="thead-dark">
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Edit</th>
                      <th />
                    </tr>
                  </thead>

                  <tbody>
                    {catstate.map((item) => {
                      console.log("xxx", x);

                      return (
                        <>
                          <tr>
                            <td>{x++}</td>
                            <td>{item.name}</td>

                            <td>
                              <div>
                                <button
                                  className="btn btn-danger"
                                  onClick={() => delcategory(item._id)}
                                >
                                  Delete
                                </button>
                                <a
                                  to="#"
                                  className="btn btn-success"
                                  data-toggle="modal"
                                  data-target="#addCategoryModal"
                                >
                                  Update
                                </a>
                              </div>
                              {/* <Button onClick={() => updateproduct(item._id)}>Update</Button> */}
                              {/* <a href="details.html" className="btn btn-secondary">
                              <i className="fas fa-angle-double-right" /> Details
                            </a> */}
                            </td>
                          </tr>{" "}
                        </>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="modal fade" id="addCategoryModal">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header bg-success text-white">
              <h5 className="modal-title">Update Category</h5>
              <button className="close" data-dismiss="modal">
                <span>×</span>
              </button>
            </div>
            <div className="modal-body">
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Name"
                    name="name"
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
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
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
  );
};

export default Categories;
