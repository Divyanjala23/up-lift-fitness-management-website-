import React from "react";
import './dashboard.css';

const Sidebar = () => {
  return (
    <div className="sidebar-container">
      <nav className="sidebar-nav">
        {/* Brand */}
        <a href="index.html" className="sidebar-brand">
          <h3 className="sidebar-logo">
            <i className="fa fa-user-edit sidebar-icon"></i>DarkPan
          </h3>
        </a>

        {/* User Section */}
        <div className="user-section">
          <div className="user-avatar">
            {/* Uncomment and use image path if needed */}
            {/* <img className="user-image" src={userImage} alt="User" /> */}
            <div className="user-status-indicator"></div>
          </div>
          <div className="user-info">
            <h6 className="user-name">John Doe</h6>
            <span className="user-role">Admin</span>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="sidebar-links">
          <a href="index.html" className="sidebar-link">
            <i className="fa fa-tachometer-alt link-icon"></i>Dashboard
          </a>

          <div className="sidebar-dropdown">
            <a href="#" className="sidebar-dropdown-toggle">
              <i className="fa fa-laptop link-icon"></i>Elements
            </a>
            <div className="sidebar-dropdown-menu">
              <a href="button.html" className="sidebar-dropdown-item">Buttons</a>
              <a href="typography.html" className="sidebar-dropdown-item">Typography</a>
              <a href="element.html" className="sidebar-dropdown-item">Other Elements</a>
            </div>
          </div>

          <a href="widget.html" className="sidebar-link">
            <i className="fa fa-th link-icon"></i>Widgets
          </a>
          <a href="form.html" className="sidebar-link">
            <i className="fa fa-keyboard link-icon"></i>Forms
          </a>
          <a href="table.html" className="sidebar-link active">
            <i className="fa fa-table link-icon"></i>Tables
          </a>
          <a href="chart.html" className="sidebar-link">
            <i className="fa fa-chart-bar link-icon"></i>Charts
          </a>

          <div className="sidebar-dropdown">
            <a href="#" className="sidebar-dropdown-toggle">
              <i className="far fa-file-alt link-icon"></i>Pages
            </a>
            <div className="sidebar-dropdown-menu">
              <a href="signin.html" className="sidebar-dropdown-item">Sign In</a>
              <a href="signup.html" className="sidebar-dropdown-item">Sign Up</a>
              <a href="404.html" className="sidebar-dropdown-item">404 Error</a>
              <a href="blank.html" className="sidebar-dropdown-item">Blank Page</a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
