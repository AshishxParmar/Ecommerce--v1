import React from "react";
import { NavLink } from "react-router-dom";

const Signup = (props) => {
  return (
    <>
      <div className="col-sm-8 offset-4 mt-5 mb-5 col-form-label">
        <form method="POST">
          <h1> REGISTER HERE</h1> <br></br>
          <div className="form-group" className="form-group w-25">
            <label for="exampleInputEmail1">Email address</label>
            <input
              type="email"
              name="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              autoComplete="off"
            />
          </div>
          <br></br>
          <div className="form-group" className="form-group w-25">
            <label for="exampleInputPassword1">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Password"
              autoComplete="off"
            />
          </div>
          <br></br>
          <div className="form-group" className="form-group w-25">
            <label for="exampleInputPassword1">Phone</label>
            <input
              type="number"
              name="phone"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Phone"
              autoComplete="off"
            />
          </div>
          <br></br>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>{" "}
          <br></br>
          <NavLink to="/login">Already have an account?</NavLink>
        </form>
      </div>
    </>
  );
};

export default Signup;
