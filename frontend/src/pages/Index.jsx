import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import 'bootstrap/dist/css/bootstrap.min.css';

const Index = () => {
  return (
    <div>
      
      <div className="container-fluid p-0">
        <div
          className="d-flex justify-content-center align-items-center text-white text-center"
          style={{
            height: '60vh',
            backgroundImage: "url('https://img.freepik.com/free-photo/businessman-reading-news_53876-23044.jpg?t=st=1738943444~exp=1738947044~hmac=2cac617d026aad7fcc609277e37c3f57a89c1dc4d4ef0374362735abd4599c9d&w=1060')",
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            width:'1407px',
          }}
        >
          <h1 className="fw-bold bg-dark bg-opacity-50 p-3 rounded">
            Finance Management Platform
          </h1>
        </div>
      </div>

    </div>
  );
};

export default Index;
