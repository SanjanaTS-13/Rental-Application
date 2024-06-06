import React from 'react';
import {useRef } from "react";
import {FaBars, FaTimes} from "react-icons/fa";
import '../../App.css';


function NavBar() {
  const navRef = useRef();

  const showNavBar = () => {
    navRef.current.classList.toggle("responsive_nav");
  }

  return(
    <header className='nav-header'>
      <h3 className='header-title'>HoosierRentals.com</h3>
      <nav ref={navRef}>
        <a href='/'>Home</a>
        <a href='/userdetails'>My Profile</a>
        <a href='/searchandfilter'>Cars</a>
        <a href='/carservices'>Services</a>
        <a href='/login'>Logout</a>
        <button className="nav-btn nav-close-btn" onClick={showNavBar}>
          <FaTimes/>
        </button>
      </nav>
      <button className="nav-btn" onClick={showNavBar}>
        <FaBars/>
      </button>
    </header>
  );
  
}

export default NavBar;