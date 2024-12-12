import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { useAuth } from './Contaxt/AuthContaxt';
function Navbar() {
    const [isMobile, setIsMobile] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobile(!isMobile);
  };
  const { isAuthenticated, logout } = useAuth();
  return (
    <Nav>
    <div>
    <nav className="navbar">
      <div className="navbar-logo">
        {/* <h1>Email.temp</h1> */}
        <img className='logo' src="/logo.png" alt="" />
      </div>
      <ul className={isMobile ? "navbar-links-mobile open" : "navbar-links"} onClick={() => setIsMobile(false)}>
      <li><NavLink  to="/" activeclassname="active">Home</NavLink></li>
      {/* <li><NavLink exact to="/service" activeClassName="active">Service</NavLink></li>
        <li><NavLink exact to="/about" activeClassName="active">About</NavLink></li>
        <li><NavLink exact to="/contact" activeClassName="active">Contact</NavLink></li> */}
         <li>{isAuthenticated ? (
        <NavLink to="/" onClick={logout}>Logout</NavLink>
      ) : (
        <NavLink  to="/login" activeclassname="active">Login</NavLink>
      )}</li>
        
      </ul>

      <button className="mobile-menu-icon" onClick={toggleMobileMenu}>
        {isMobile ? <>&#10005;</> : <>&#9776;</>}
      </button>
    </nav>
    </div>
    </Nav>
  )
}
const Nav=styled.nav`
/* Navbar.css */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 4rem;
  // background-color:#e8e8e8;
  background-color:#212121;
  color: #007bff;
  position: relative;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.5)
}

// .navbar-logo h1 {
//   font-size: 1.5rem;
// //   color: #fff;
// }
.logo{
width:20%;
}

.navbar-links {
  display: flex;
  list-style: none;
}

.navbar-links li {
  margin: 0 1rem;
}

.navbar-links a {
  color:  #007bff;
  font-size:1.5rem;
  text-decoration: none;
  transition: color 0.3s ease;
}

.navbar-links a:hover,
.navbar-links a.active {
//   color: #ffa500;
  color: #007bff;
  font-weight: bold;
}

/* Mobile menu icon */
.mobile-menu-icon {
  display: none;
  font-size: 2rem;
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
  z-index:1001;
}

/* Alternative Mobile styling with slide-in menu */
@media (max-width: 768px) {
.navbar{
    padding:1rem 2rem;

}
    .logo{
width:40%;
}
  .navbar-links {
    display: none;
  }
  
  .navbar-links-mobile {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    width: 50%; /* Adjust width as desired */
    background-color: #333;
    padding-top: 3rem;
    transform: translateX(100%);
    transition: transform 0.3s ease-in-out;
    z-index: 1000;
    list-style: none;
  }

  .navbar-links-mobile li {
    margin: 1.5rem 0;
    text-align: center;
  }

  .navbar-links-mobile a {
    color: #fff;
    font-size: 1.2rem;
    text-decoration:none;
  }

  /* Show the mobile menu when isMobile is true */
  .navbar-links-mobile.open {
    transform: translateX(0);
  }

  .mobile-menu-icon {
    display: block;
  }
}

`
export default Navbar