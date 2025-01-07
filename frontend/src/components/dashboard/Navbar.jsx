import React from "react";
import './dashboard.css';

const Navbar = () => {
    return (
        <nav className="navbar-container">
            {/* Brand Logo */}
            <a href="index.html" className="navbar-brand">
                <h2 className="navbar-logo">
                    <i className="fa fa-user-edit"></i>
                </h2>
            </a>

            {/* Sidebar Toggler */}
            <a href="#" className="sidebar-toggler">
                <i className="fa fa-bars"></i>
            </a>

            {/* Search Form */}
            <form className="search-form">
                <input
                    className="search-input"
                    type="search"
                    placeholder="Search"
                />
            </form>

            {/* Navbar Items */}
            <div className="navbar-items">
                {/* Messages Dropdown */}
                <div className="dropdown messages-dropdown">
                    <a href="#" className="dropdown-toggle">
                        <i className="fa fa-envelope"></i>
                        <span className="dropdown-label">Message</span>
                    </a>
                    <div className="dropdown-menu">
                        {[...Array(3)].map((_, index) => (
                            <React.Fragment key={index}>
                                <a href="#" className="dropdown-item">
                                    <div className="dropdown-message-content">
                                        <h6 className="dropdown-message-title">John sent you a message</h6>
                                        <small className="dropdown-message-time">15 minutes ago</small>
                                    </div>
                                </a>
                                {index < 2 && <hr className="dropdown-divider" />}
                            </React.Fragment>
                        ))}
                        <a href="#" className="dropdown-footer">
                            See all messages
                        </a>
                    </div>
                </div>

                {/* Notifications Dropdown */}
                <div className="dropdown notifications-dropdown">
                    <a href="#" className="dropdown-toggle">
                        <i className="fa fa-bell"></i>
                        <span className="dropdown-label">Notification</span>
                    </a>
                    <div className="dropdown-menu">
                        {[
                            { message: "Profile updated", time: "15 minutes ago" },
                            { message: "New user added", time: "15 minutes ago" },
                            { message: "Password changed", time: "15 minutes ago" },
                        ].map((notification, index) => (
                            <React.Fragment key={index}>
                                <a href="#" className="dropdown-item">
                                    <h6 className="dropdown-notification-title">{notification.message}</h6>
                                    <small className="dropdown-notification-time">{notification.time}</small>
                                </a>
                                {index < 2 && <hr className="dropdown-divider" />}
                            </React.Fragment>
                        ))}
                        <a href="#" className="dropdown-footer">
                            See all notifications
                        </a>
                    </div>
                </div>

                {/* User Profile Dropdown */}
                <div className="dropdown profile-dropdown">
                    <a href="#" className="dropdown-toggle">
                        <span className="profile-name">John Doe</span>
                    </a>
                    <div className="dropdown-menu">
                        <a href="#" className="dropdown-item">My Profile</a>
                        <a href="#" className="dropdown-item">Settings</a>
                        <a href="#" className="dropdown-item">Log Out</a>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
