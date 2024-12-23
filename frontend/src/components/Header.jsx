import React from 'react';
import Logo from '../assets/img/logo/logo.png';
import { Link } from 'react-router-dom';
import '../assets/css/header.css';

const Header = () => {
  return (
    <header>
      <div className="header-area header-transparent" style={{ backgroundColor: 'black' }}>
        <div className="main-header header-sticky">
          <div className="container-fluid">
            <div className="row align-items-center">
              <div className="col-xl-2 col-lg-2 col-md-1">
                <div className="logo">
                  <Link to="/">
                    <img className="img-fluid" src={Logo} alt="Logo" />
                  </Link>
                </div>
              </div>
              <div className="col-xl-10 col-lg-10 col-md-10">
                <div className="menu-main d-flex align-items-center justify-content-end">
                  <div className="main-menu f-right d-none d-lg-block">
                    <nav>
                      <ul id="navigation">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/service">Services</Link></li>
                        <li><Link to="/schedule">Schedule</Link></li>
                        <li><Link to="/contactus">Contact</Link></li>
                      </ul>
                    </nav>
                  </div>
                  <div className="header-right-btn f-right d-none d-lg-block ml-30">
                    <Link to="/signup" className="btn header-btn">Become a Member</Link>
                    <Link to="/login" className="btn header-btn">Log in to your acc</Link>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className="mobile_menu d-block d-lg-none"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
