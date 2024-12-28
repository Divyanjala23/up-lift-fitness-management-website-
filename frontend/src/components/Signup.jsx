import React, { useState } from "react";
import '../assets/css/signUp.css';

const Signup = () => {
  const [selectedRole, setSelectedRole] = useState(null); // State to manage selected role
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    experience: "",
    specialization: "",
    age: "",
    gender: "",
    username: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`${selectedRole} Registration Data:`, formData);
  };

  return (
    <div className="signup-main">
      <div className="container">
        {!selectedRole ? (
          <div className="role-selection">
            <h2 className="form-header">Select Role</h2>
            <button className="buttonm" onClick={() => setSelectedRole("Coach")}>
              {/* <img src="/path/to/coach-icon.png" alt="Coach Icon" /> */}
              COACH
            </button>
            <button className="buttonm" onClick={() => setSelectedRole("Member")}>
              {/* <img src="/path/to/member-icon.png" alt="Member Icon" /> */}
              MEMBER
            </button>
          </div>
        ) : (
          <div className="form-container">
            <h2 className="section-title">{selectedRole} Registration</h2>
            <form onSubmit={handleSubmit} className="signup-form">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="fullname"
                  placeholder="Full Name"
                  value={formData.fullname}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>

              {selectedRole === "Coach" && (
                <>
                  <div className="form-group">
                    <label>Experience in Years</label>
                    <input
                      type="number"
                      name="experience"
                      placeholder="Experience in Years"
                      value={formData.experience}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Specialization</label>
                    <input
                      type="text"
                      name="specialization"
                      placeholder="Specialization"
                      value={formData.specialization}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    />
                  </div>
                </>
              )}

              {selectedRole === "Member" && (
                <>
                  <div className="form-group">
                    <label>Age</label>
                    <input
                      type="number"
                      name="age"
                      placeholder="Age"
                      value={formData.age}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Gender</label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </>
              )}

              <div className="form-group">
                <label>Username</label>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>

              <button type="submit" className="button">
                Register as {selectedRole}
              </button>

              <button
                type="button"
                className="button"
                onClick={() => setSelectedRole(null)}
                style={{ marginTop: "10px", backgroundColor: "#6c757d" }}
              >
                Go Back
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Signup;
