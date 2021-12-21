import React from 'react'
import { useNavigate } from 'react-router-dom'
import { NavLink } from 'react-router-dom';


const AdminLogin = () => {

    const navigate = useNavigate()

    const handleChange = () => {

        navigate('/Index')

    }
    return (<>
        <div>
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark p-0">
                <div className="container">
                    <NavLink to="/" className="navbar-brand">Shoppers</NavLink>
                </div>
            </nav>

            <header id="main-header" className="py-2 bg-primary text-white">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <h1>
                                <i className="fas fa-user" /> Admin</h1>
                        </div>
                    </div>
                </div>
            </header>

            <section id="actions" className="py-4 mb-4 bg-light">
                <div className="container">
                    <div className="row">
                    </div>
                </div>
            </section>

            <section id="login">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 mx-auto">
                            <div className="card">
                                <div className="card-header">
                                    <h4>Account Login</h4>
                                </div>
                                <div className="card-body">
                                    <form action="/Index" method="get">
                                        <div className="form-group">
                                            <label htmlFor="email">Email</label>
                                            <input type="text" className="form-control" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="password">Password</label>
                                            <input type="password" className="form-control" />
                                        </div>
                                        <input defaultValue="Login" onClick={handleChange} className="btn btn-primary btn-block" />
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

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
        </div>
    </ >
    )
}

export default AdminLogin

