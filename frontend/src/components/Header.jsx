import React from 'react'
import Logo from '../assets/img/logo/logo.png'
import { Link } from 'react-router-dom';
import '../assets/css/header.css';


const Header = () => {
  return (
    <header>
    {/* <!--? Header Start --> */}
    <div class="header-area header-transparent" style={{ backgroundColor: 'black' }}>
        <div class="main-header header-sticky">
            <div class="container-fluid">
                <div class="row align-items-center">
                    {/* <!-- Logo --> */}
                    <div class="col-xl-2 col-lg-2 col-md-1">
                        <div class="logo">
                            <a href="/">
                                <img className='img-fluid' src={Logo} alt=""/>
                            </a>
                        </div>
                    </div>
                    <div class="col-xl-10 col-lg-10 col-md-10">
                    <div className="menu-main d-flex align-items-center justify-content-end" >
                    {/* <!-- Main-menu --> */}
                            <div class="main-menu f-right d-none d-lg-block">
                                <nav>
                                    <ul id="navigation">
                                        <li><a href="/">Home</a></li>
                                        <li><a href="/about">About</a></li>
                                        <li><a href="/service">Services</a></li>
                                        <li><a href="/shedule">schedule</a></li>
                                        <li><a href="/contactus">Contact</a></li>
                                    </ul>
                                </nav>
                            </div>
                            <div class="header-right-btn f-right d-none d-lg-block ml-30">
                            <Link to="/signup" className="btn header-btn">Become a Member</Link>
                            </div>
                        </div>
                    </div>   
                    {/* <!-- Mobile Menu --> */}
                    <div class="col-12">
                        <div class="mobile_menu d-block d-lg-none"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    {/* <!-- Header End --> */}
</header>
  )
}

export default Header