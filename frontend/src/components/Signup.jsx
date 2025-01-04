import React, { useState } from "react";
import axios from "axios"; // Import axios
import '../assets/css/signUp.css';

const Signup = () => {
  const [selectedRole, setSelectedRole] = useState(null); // State to manage selected role
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    experience: "",
    specialization: "",
    age: "",
    gender: "",
    username: "",
    password: "",
  });
  const [statusMessage, setStatusMessage] = useState(""); // State to show success/error messages

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...formData, role: selectedRole };
      const apiUrl = selectedRole === "Coach"
        ? "http://localhost:8080/api/coaches/signup"
        : "http://localhost:8080/api/members/signup"; // Use different URLs for Coach and Member
  
      const response = await axios.post(apiUrl, payload);
  
      if (response.status === 201 || response.status === 200) {
        setStatusMessage("Registration successful!");
      } else {
        setStatusMessage("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setStatusMessage("An error occurred. Please try again.");
    }
  };
  

  return (
    <div className="signup-main">
      <div className="container">
        {!selectedRole ? (
          <div className="role-selection">
            <h2 className="form-header">Select Role</h2>
            <button className="buttonm" onClick={() => setSelectedRole("Coach")}>
              COACH
            </button>
            <button className="buttonm" onClick={() => setSelectedRole("Member")}>
              MEMBER
            </button>
          </div>
        ) : (
          <div className="form-container">
            <h2 className="section-title">{selectedRole} Registration</h2>
            {statusMessage && <p className="status-message">{statusMessage}</p>} {/* Display status messages */}
            <form onSubmit={handleSubmit} className="signup-form">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
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
                    <select
                      name="specialization"
                      value={formData.specialization}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    >
                       <option value="">Select Specialization</option>
                      <option value="Sports-Specific Training">Sports-Specific Training</option>
                      <option value="Cardio Training">Cardio Training
                      </option>
                      <option value="Strength and Conditioning">Strength and Conditioning</option>
                      <option value="Yoga and Flexibility Training">Yoga and Flexibility Training</option>
                      <option value="Weight Loss Coaching">Weight Loss Coaching</option>
                    </select>
                  </div>
                </>
              )}

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
