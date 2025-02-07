import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const SignUp = ({ setIsRegistering }) => {  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  
  const isValidateEmail = (email) => {
    const re = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
    return re.test(email);
  };

  const handleValidation = () => {
    const newErrors = {};

    if (!formData.name.match(/^[A-Za-z]+$/)) {
      newErrors.name = 'Name must contain only letters';
    }

    if (!isValidateEmail(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const register = async () => {
    if (!handleValidation()) return;

    try {
      await axios.post('http://localhost:5000/api/register', formData);
      toast.success('Registration successful');
      setIsRegistering(false); 
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });

    const newErrors = { ...errors };

    switch (id) {
      case 'name':
        if (!value.match(/^[A-Za-z]+$/)) {
          newErrors.name = 'Name must contain only letters';
        } else {
          delete newErrors.name;
        }
        break;

      case 'email':
        if (!isValidateEmail(value)) {
          newErrors.email = 'Invalid email address';
        } else {
          delete newErrors.email;
        }
        break;

      case 'password':
        if (!value) {
          newErrors.password = 'Password is required';
        } else if (value.length < 6) {
          newErrors.password = 'Password must be at least 6 characters';
        } else {
          delete newErrors.password;
        }
        break;

      case 'confirmPassword':
        if (value !== formData.password) {
          newErrors.confirmPassword = 'Passwords do not match';
        } else {
          delete newErrors.confirmPassword;
        }
        break;

      default:
        break;
    }

    setErrors(newErrors);
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center min-vh-100">
      <ToastContainer position="top-center" autoClose={3000} />
      <div className="row w-100 h-100">
        <div className="col-12 col-md-6 d-flex justify-content-center align-items-center bg-white p-4">
          <div className="w-100">
            <h2 className="text-center mb-4 text-primary">
              Sign Up <span className="text-dark">Here</span>
            </h2>
            <form onSubmit={(e) => { e.preventDefault(); register(); }}>
              <div className="mb-4">
                <div className="d-flex justify-content-center">
                  <input
                    type="text"
                    id="name"
                    className={`form-control w-50 rounded-pill ${errors.name ? 'is-invalid' : ''}`}
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                {errors.name && <div className="invalid-feedback d-block text-center">{errors.name}</div>}
              </div>

              <div className="mb-4">
                <div className="d-flex justify-content-center">
                  <input
                    type="email"
                    id="email"
                    className={`form-control w-50 rounded-pill ${errors.email ? 'is-invalid' : ''}`}
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                {errors.email && <div className="invalid-feedback d-block text-center">{errors.email}</div>}
              </div>

              <div className="mb-4">
                <div className="d-flex justify-content-center">
                  <input
                    type="password"
                    id="password"
                    className={`form-control w-50 rounded-pill ${errors.password ? 'is-invalid' : ''}`}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                {errors.password && <div className="invalid-feedback d-block text-center">{errors.password}</div>}
              </div>

              <div className="mb-4">
                <div className="d-flex justify-content-center">
                  <input
                    type="password"
                    id="confirmPassword"
                    className={`form-control w-50 rounded-pill ${errors.confirmPassword ? 'is-invalid' : ''}`}
                    placeholder="Re-enter your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                </div>
                {errors.confirmPassword && <div className="invalid-feedback d-block text-center">{errors.confirmPassword}</div>}
              </div>

              <div className="d-flex justify-content-center mb-3 mt-5">
                <button type="submit" className="btn btn-dark login-btn w-50 rounded-pill">Sign Up</button>
              </div>

              <div className="d-flex justify-content-center">
                <p className="text-center">
                  Already have an account? <a href="/login">Login</a>
                </p>
              </div>
            </form>
          </div>
        </div>

        <div className="col-12 col-md-6 p-0">
          <img
            src="https://img.freepik.com/free-photo/businessman-is-using-computer-laptop_53876-144845.jpg?t=st=1738943172~exp=1738946772~hmac=961e9b1b5d8c67a47ca312d7df42ad5c0951ff5b5236a6ce4d4855468a78ea25&w=996"
            alt="signup-image"
            className="img-fluid w-100"
            style={{ height: '100vh', objectFit: 'cover' }}
          />
        </div>
      </div>
    </div>
  );
};

export default SignUp;

