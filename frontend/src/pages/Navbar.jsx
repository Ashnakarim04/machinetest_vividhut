import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
const Navbar = () => {
    const [user, setUser] = useState(null);

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        toast.info('Logged out successfully');
        window.location.reload();
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top w-100">
            <div className="container-fluid">
                <a href="/" className="navbar-brand d-flex align-items-center">
                    <img
                        src="https://img.freepik.com/free-vector/branding-identity-corporate-vector-logo-r-design_460848-8630.jpg?t=st=1738093631~exp=1738097231~hmac=4caf267f5499d76e3a37d05466a59be39601e8844eae3da1bbccd30afaeabb1e&w=826"
                        alt="Logo"
                        className="rounded-circle"
                        style={{ width: '40px', height: '40px' }}
                    />
                    <span className="ms-2 text-white">Finance Tracker</span>
                </a>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

              
                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul className="navbar-nav">
                        {!localStorage.getItem("token") ? (
                            <Link to="/signup" className="nav-link">Login/SignUp</Link>
                        ) : (
                            <>
                                <Link to="/dashboard" className="nav-link">Dashboard</Link>
                                <Link to="/transactions" className="nav-link">Transactions</Link>
                                <li className="nav-item">
                                    <button
                                        className="btn btn-link nav-link"
                                        onClick={logout}
                                        style={{ textDecoration: 'none' }}
                                    >
                                        Logout
                                    </button>
                                </li>
                            </>
                        )}
                    </ul>
                </div>

            </div>
        </nav>
    );
};

export default Navbar; 
