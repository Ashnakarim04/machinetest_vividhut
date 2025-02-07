import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-5 w-100">
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 col-sm-4 mb-4 mb-sm-0">
            <h3 className="h4 font-weight-bold mb-3 text-primary">Finance Tracker</h3>
            <p className="text-white">
             Personal Finanace Management System
            </p>
          </div>

          <div className="col-12 col-sm-4 mb-4 mb-sm-0">
            <h4 className="h5 font-weight-semibold mb-3 text-primary">Quick Links</h4>
            <ul className="list-unstyled">
              <li><a href="#" className="text-white hover:text-primary">Home</a></li>
              <li><a href="#" className="text-white hover:text-primary">About Us</a></li>
              <li><a href="#" className="text-white hover:text-primary">Contact Us</a></li>
              <li><a href="#" className="text-white hover:text-primary">Dashboard</a></li>
              <li><a href="#" className="text-white hover:text-primary">Sign Up</a></li>
            </ul>
          </div>

          <div className="col-12 col-sm-4">
            <h4 className="h5 font-weight-semibold mb-3 text-primary">Contact Us</h4>
            <p className="text-white">
              <strong>Email:</strong> sample@gmail.com <br />
              <strong>Phone:</strong> +91 6238541120 <br />
              <strong>Address:</strong> St. Theras Lane, Kochi
            </p>
            <div className="mt-4">
              <h4 className="h5 font-weight-semibold text-primary">Follow Us</h4>
              <div className="d-flex justify-content-start mt-2">
                <a href="#" className="text-white me-3">
                  <FaFacebook />
                </a>
                <a href="#" className="text-white me-3">
                  <FaTwitter />
                </a>
                <a href="#" className="text-white me-3">
                  <FaInstagram />
                </a>
                <a href="#" className="text-white">
                  <FaLinkedin />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-top border-light mt-5 pt-4 text-center">
          <p className="mb-0 text-white">© {new Date().getFullYear()} CompanyName. All rights reserved. | Privacy Policy | Terms of Service</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
