import React, { useState, useEffect } from "react";
import axios from "axios";
import { Dropdown, Form } from "react-bootstrap";
import Select from "react-bootstrap";
import Adminnavbar from "./Adminnavbar";

const Users = () => {
  const [select, setSelect] = useState("");
  const [userstate, setUserstate] = useState([]);

  function getUser() {
    axios.get("/users").then((res) => {
      const data = res.data;

      setUserstate(data);
    });
  }
  useEffect(() => {
    getUser();
  }, []);

  //   function delcategory(_id) {

  //     axios.delete(`/categorydata/${_id}`).then((res) => {
  //       console.log("category deleted")
  //       getCategory();

  //     })
  //   }

  function changerole(id) {
    console.log("of chnagerole");
    axios.patch(`/users/${id}`).then((res) => {
      console.log("user updated");
      getUser();
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
                <i className="fas fa-folder" /> Users
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
                  placeholder="Search Users..."
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
                  <h4>All Users</h4>
                </div>
                <table className="table table-striped">
                  <thead className="thead-dark">
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Edit</th>
                      <th />
                    </tr>
                  </thead>

                  <tbody>
                    {userstate.map((item) => {
                      console.log("xxx", item);

                      return (
                        <>
                          <tr>
                            <td>{x++}</td>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.role}</td>
                            <h4>{select}</h4>
                            <Form.Select
                              size="sm"
                              onChange={(e) => setSelect(e.target.value)}
                              onClick={changerole}
                            >
                              <option>Admin</option>
                              <option>User</option>
                            </Form.Select>

                            {/* <Dropdown>
                                                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                                                            {item.role}
                                                        </Dropdown.Toggle>

                                                        <Dropdown.Menu>
                                                            <Dropdown.Item href="#/action-1">Admin</Dropdown.Item>
                                                            <Dropdown.Item href="#/action-2">User</Dropdown.Item>

                                                        </Dropdown.Menu>
                                                    </Dropdown> */}

                            {/* <td>
                                                        <div>
                                                            <button className="btn btn-danger" onClick={() => delcategory(item._id)}>Delete</button>
                                                            <a to="#" className="btn btn-success" data-toggle="modal" data-target="#addCategoryModal">
                                                                Update
                                                            </a>
                                                        </div>
                                                        <Button onClick={() => updateproduct(item._id)}>Update</Button>
                                                        <a href="details.html" className="btn btn-secondary">
                                                            <i className="fas fa-angle-double-right" /> Details
                                                        </a>
                                                    </td> */}
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

export default Users;
