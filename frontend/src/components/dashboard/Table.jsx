import React from "react";
import './dashboard.css';

const Table = () => {
  return (
    <div className="table-container">
      <div className="table-row">
        {/* Basic Table */}
        <div className="table-column">
          <div className="table-wrapper">
            <h6 className="table-title">Basic Table</h6>
            <table className="custom-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>John</td>
                  <td>Doe</td>
                  <td>jhon@email.com</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>mark@email.com</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>jacob@email.com</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Accented Table */}
        <div className="table-column">
          <div className="table-wrapper">
            <h6 className="table-title">Accented Table</h6>
            <table className="custom-table custom-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>John</td>
                  <td>Doe</td>
                  <td>jhon@email.com</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>mark@email.com</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>jacob@email.com</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Additional tables can follow the same structure */}
    </div>
  );
};

export default Table;
