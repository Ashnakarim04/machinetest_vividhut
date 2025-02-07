import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = ({ setIsRegistering }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('All fields are required');
      return;
    }
    try {
      const res = await axios.post('http://localhost:5000/api/login', { email, password });
      localStorage.setItem('token', res.data.token);
      toast.success('Login successful');
      window.location.reload();
    } catch (err) {
      toast.error('Invalid credentials');
    }
  };

  return (
    <div className="container-fluid d-flex min-vh-100 p-0 m-0">
      <div className="col-12 col-md-6 p-0 m-0">
        <img
          src="https://img.freepik.com/free-photo/colleagues-working-desktop_53876-15271.jpg?t=st=1738943086~exp=1738946686~hmac=84d8935ffc65ff0d454ebe53034054e47eb059cc8422e4c820a59f5ca733cd3b&w=1060"
          alt="login-image"
          className="img-fluid w-100"
          style={{ height: '100vh', objectFit: 'cover' }}
        />
      </div>

      <div className="col-12 col-md-6 d-flex align-items-center justify-content-center bg-white p-4">
        <div className="w-100">
          <h2 className="text-center mb-4 text-primary">
            Login <span className="text-dark">Here</span>
          </h2>
          <form onSubmit={login} className='mt-5'>
            <div className="mb-4 d-flex justify-content-center">
              <div className="w-50">
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control rounded-pill"
                />
              </div>
            </div>

            <div className="mb-3 d-flex justify-content-center">
              <div className="w-50">
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control rounded-pill"
                />
              </div>
            </div>

            <div className="d-flex justify-content-center mb-3 mt-5">
              <button
                type="submit"
                className="btn btn-dark btn-sm w-50 rounded-pill login-btn"
              >
                Login
              </button>
            </div>

            <p className="text-center">
              Don't have an account? <button className="btn btn-link p-0" onClick={() => setIsRegistering(true)}>Sign up</button>
            </p>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;

