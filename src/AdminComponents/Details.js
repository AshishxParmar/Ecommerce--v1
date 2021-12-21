import React from "react";
import Adminnavbar from "./Adminnavbar";

const Details = () => {
  return (
    <div>
      <div>
        <Adminnavbar />
        {/* HEADER */}
        <header id="main-header" className="py-2 bg-primary text-white">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <h1>Post One</h1>
              </div>
            </div>
          </div>
        </header>
        {/* ACTIONS */}
        <section id="actions" className="py-4 mb-4 bg-light">
          <div className="container">
            <div className="row">
              <div className="col-md-3">
                <a href="index.html" className="btn btn-light btn-block">
                  <i className="fas fa-arrow-left" /> Back To Dashboard
                </a>
              </div>
              <div className="col-md-3">
                <a href="index.html" className="btn btn-success btn-block">
                  <i className="fas fa-check" /> Save Changes
                </a>
              </div>
              <div className="col-md-3">
                <a href="index.html" className="btn btn-danger btn-block">
                  <i className="fas fa-trash" /> Delete Post
                </a>
              </div>
            </div>
          </div>
        </section>
        {/* DETAILS */}
        <section id="details">
          <div className="container">
            <div className="row">
              <div className="col">
                <div className="card">
                  <div className="card-header">
                    <h4>Edit Post</h4>
                  </div>
                  <div className="card-body">
                    <form>
                      <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input
                          type="text"
                          className="form-control"
                          defaultValue="Post One"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="category">Category</label>
                        <select className="form-control">
                          <option value selected>
                            Web Development
                          </option>
                          <option value>Tech Gadgets</option>
                          <option value>Business</option>
                          <option value>Health &amp; Wellness</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label htmlFor="image">Upload Image</label>
                        <div className="custom-file">
                          <input
                            type="file"
                            className="custom-file-input"
                            id="image"
                          />
                          <label htmlFor="image" className="custom-file-label">
                            Choose File
                          </label>
                        </div>
                        <small className="form-text text-muted">
                          Max Size 3mb
                        </small>
                      </div>
                      <div className="form-group">
                        <label htmlFor="body">Body</label>
                        <textarea
                          name="editor1"
                          className="form-control"
                          defaultValue={
                            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat culpa nam cumque voluptatum. Possimus recusandae porro architecto officiis illo dignissimos ratione aut officia reprehenderit! Iure cum numquam fugit doloremque quis ullam illo odit, odio voluptates non quisquam laboriosam consectetur quasi perspiciatis! Sapiente minus aperiam nobis molestias autem ut praesentium laudantium?"
                          }
                        />
                      </div>
                    </form>
                  </div>
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
        {/* MODALS */}
        {/* ADD POST MODAL */}
        <div className="modal fade" id="addPostModal">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">Add Post</h5>
                <button className="close" data-dismiss="modal">
                  <span>×</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <select className="form-control">
                      <option value>Web Development</option>
                      <option value>Tech Gadgets</option>
                      <option value>Business</option>
                      <option value>Health &amp; Wellness</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="image">Upload Image</label>
                    <div className="custom-file">
                      <input
                        type="file"
                        className="custom-file-input"
                        id="image"
                      />
                      <label htmlFor="image" className="custom-file-label">
                        Choose File
                      </label>
                    </div>
                    <small className="form-text text-muted">Max Size 3mb</small>
                  </div>
                  <div className="form-group">
                    <label htmlFor="body">Body</label>
                    <textarea
                      name="editor1"
                      className="form-control"
                      defaultValue={""}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button className="btn btn-primary" data-dismiss="modal">
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
                <form>
                  <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text" className="form-control" />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button className="btn btn-success" data-dismiss="modal">
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

export default Details;
