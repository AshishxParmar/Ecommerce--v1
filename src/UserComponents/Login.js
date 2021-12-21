import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { useNavigate, NavLink } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "./Login.css";
import axios from "axios"

export default function Login() {
    const history = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function userlogin(e) {
        e.preventDefault();
        axios.post("/login", {
            email: email,
            password: password
        }).then(res => {

            console.log("res", res)
            if (res.status === 422 || !res) {
                window.alert("Email wrong");
            } else if (res.status === 420) {
                window.alert(" Fill the Fields");


            } else {
                console.log("else")
                if (res.data.token) {
                    console.log("if")
                    localStorage.setItem("token", res.data.token);
                    localStorage.setItem("token", JSON.stringify(res.data.userLogin));
                    window.alert('LOGIN SUCCESSFULL')
                    history('/')
                }
            }



        })

    }
    function validateForm() {
        return email.length > 0 && password.length > 5;
    }

    function handleSubmit(event) {
        event.preventDefault();
    }




    return (
        <div className="Login">
            <Form onSubmit={handleSubmit}>
                <Form.Group size="lg" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        autoFocus
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Button block size="lg" type="submit" disabled={!validateForm()} onClick={userlogin}>
                    Login
                </Button>
                <p className="small fw-bold mt-2 pt-1 mb-0">
                    Don't have an account?{" "}
                    <NavLink to="/signup" className="link-danger">
                        SignUp
                    </NavLink>
                </p>
            </Form>
        </div>
    );
}