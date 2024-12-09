// Footer.js
import React from 'react';
import styled from 'styled-components';
import { IoLogoInstagram,IoLogoFacebook,IoLogoGithub } from "react-icons/io";
import { MdAlternateEmail } from "react-icons/md";

const Footer = () => {
  return (
    <Foot>
    <footer className="footer">
  <div className="footer-content">
    <div className="footer-section left">
      <h3>About Company</h3>
      <p>About Us</p>
      <p>Careers</p>
      <p>Press</p>
    </div>
    <div className="footer-section middle">
      <h3>Quick Links</h3>
      <p>Home</p>
      <p>Services</p>
      <p>Blog</p>
    </div>
    <div className="footer-section right">
      <h3>Contact</h3>
      <p>Email: contact@temp.com</p>
      <p>Phone: +1 234 567 890</p>
      <div className="social">
        <p><IoLogoFacebook/></p>
        <p><IoLogoInstagram/></p>
        <p><IoLogoGithub/></p>
        <p><MdAlternateEmail/></p>
      </div>
    </div>
  </div>
  <div className="footer-copyright">
    <p>&copy; {new Date().getFullYear()} <span>Email@temp</span>. All rights reserved.</p>
  </div>
</footer>

    </Foot>
  );
};
const Foot = styled.footer`
/* General Footer Styles */
* {
  background-color: #212121;
  color: white;
}

.footer {
  padding: 40px 20px;
  text-align: left;
  font-family: Arial, sans-serif;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  max-width: 1200px;
  margin: 0 auto;
}

.footer-section {
  width: 30%;
}

.footer-section h3 {
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: #3498db;
}

.footer-section p {
  font-size: 1rem;
  margin-bottom: 5px;
}

.footer-section .left {
  /* Styles for 'About Company' */
  padding-right: 20px;
}

.footer-section .middle {
  /* Styles for 'Quick Links' */
  text-align: center;
}

.footer-section .right {
  /* Styles for 'Contact' */
  text-align: right;
  padding-left: 20px;
}

.social {
  display: flex;
  gap: 5px;
}

.social p {
  font-size: 1.5rem;
  cursor: pointer;
}

.social p:hover {
  color: #3498db;
}

/* Footer Copyright */
.footer-copyright {
  padding: 20px;
  text-align: center;
}

.footer-copyright p {
  margin: 0;
}

.footer-copyright span {
  font-weight: bold;
  color: #3498db;
}

/* Responsive Design */
@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    align-items: center;
  }

  .footer-section {
    width: 100%;
    text-align: center;
    margin-bottom: 20px;
  }

  .footer-section h3 {
    font-size: 1.3rem;
  }

  .footer-section p {
    font-size: 0.9rem;
  }

  /* Responsive design for the .social div */
  .social {
    justify-content: center; /* Center icons on mobile */
    gap: 15px; /* Increase spacing between icons for better visibility */
  }

  .social p {
    font-size: 2rem; /* Slightly increase icon size for touch screens */
  }
}
`;

export default Footer;
