import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from "axios"

const Logout = () => {

    const history = useNavigate();
    function logoutuser() {
        axios.get("/logout").then(res => {
            console.log("logont")
            localStorage.clear();
            if (res.status === 200 || !res) {
                window.alert("Logout Successful");
            }
            history("/userlogin")
        })
    }

    useEffect(() => {
        logoutuser()
    })
    return (
        <div>

        </div>
    )
}

export default Logout
