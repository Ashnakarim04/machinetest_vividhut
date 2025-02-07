import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Index from './pages/Index';
import Dashboard from './pages/Dashboard';
import Navbar from './pages/Navbar';
import Footer from './pages/Footer';
import Transactions from './pages/Transcations';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;
      try {
        const res = await axios.get('http://localhost:5000/api/user', {
          headers: { Authorization: token },
        });
        setUser(res.data);
      } catch (error) {
        console.error("Error fetching user:", error);
        localStorage.removeItem('token');
      }
    };

    fetchUser();
  }, []);

  return (
    <Router>
      <ToastContainer />
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Index />} />
          <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
          <Route path="/signup" element={user ? <Navigate to="/dashboard" /> : <SignUp />} />
          <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/transactions" element={user ? <Transactions /> : <Navigate to="/login" />} />
          <Route path="*" element={<h2 className="text-center">404 - Page Not Found</h2>} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
