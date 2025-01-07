import React from "react";
import './dashboard.css';

const Detail = () => {
  return (
    <div className="details-container">
      <div className="details-row">
        {/* Today Sale */}
        <div className="details-item">
          <div className="details-card">
            <i className="details-icon fa fa-chart-line"></i>
            <div className="details-info">
              <p className="details-title">Today Sale</p>
              <h6 className="details-value">$1234</h6>
            </div>
          </div>
        </div>

        {/* Total Sale */}
        <div className="details-item">
          <div className="details-card">
            <i className="details-icon fa fa-chart-bar"></i>
            <div className="details-info">
              <p className="details-title">Total Sale</p>
              <h6 className="details-value">$1234</h6>
            </div>
          </div>
        </div>

        {/* Today Revenue */}
        <div className="details-item">
          <div className="details-card">
            <i className="details-icon fa fa-chart-area"></i>
            <div className="details-info">
              <p className="details-title">Today Revenue</p>
              <h6 className="details-value">$1234</h6>
            </div>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="details-item">
          <div className="details-card">
            <i className="details-icon fa fa-chart-pie"></i>
            <div className="details-info">
              <p className="details-title">Total Revenue</p>
              <h6 className="details-value">$1234</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
