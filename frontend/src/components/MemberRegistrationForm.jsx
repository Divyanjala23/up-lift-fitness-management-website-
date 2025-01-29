import React, { useState } from "react";
import { motion } from "framer-motion";
import { User, Lock, Mail, Calendar, Users } from "lucide-react";

const MemberRegistrationForm = () => {
  const [memberData, setMemberData] = useState({
    fullName: "",
    email: "",
    age: "",
    gender: "",
    username: "",
    password: "",
    agreedToTerms: false,
  });

  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(""); // Error state
  const [success, setSuccess] = useState(false); // Success state

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMemberData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGenderChange = (e) => {
    setMemberData((prev) => ({
      ...prev,
      gender: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!memberData.agreedToTerms) {
      alert("Please agree to the terms and conditions.");
      return;
    }

    setLoading(true); // Start loading
    setError(""); // Clear previous errors

    try {
      const response = await fetch("http://localhost:8080/api/members/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(memberData),
      });

      if (!response.ok) {
        throw new Error("Failed to register. Please try again.");
      }

      const data = await response.json();
      console.log("Registration Successful:", data);
      setSuccess(true);
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Full Name Input */}
      <div className="relative">
        <motion.div whileHover={{ scale: 1.02 }} className="relative">
          <User size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            name="fullName"
            value={memberData.fullName}
            onChange={handleInputChange}
            className="w-full bg-gray-800 text-white pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
            placeholder="Full Name"
            required
          />
        </motion.div>
      </div>

      {/* Email Input */}
      <div className="relative">
        <motion.div whileHover={{ scale: 1.02 }} className="relative">
          <Mail size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="email"
            name="email"
            value={memberData.email}
            onChange={handleInputChange}
            className="w-full bg-gray-800 text-white pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
            placeholder="Email"
            required
          />
        </motion.div>
      </div>

      {/* Age and Gender Row */}
      <div className="grid grid-cols-2 gap-4">
        <div className="relative">
          <motion.div whileHover={{ scale: 1.02 }} className="relative">
            <Calendar size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="number"
              name="age"
              value={memberData.age}
              onChange={handleInputChange}
              className="w-full bg-gray-800 text-white pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
              placeholder="Age"
              required
            />
          </motion.div>
        </div>

        <div className="relative">
          <motion.div whileHover={{ scale: 1.02 }} className="relative">
            <Users size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <select
              name="gender"
              value={memberData.gender}
              onChange={handleGenderChange}
              className="w-full bg-gray-800 text-white pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-all appearance-none"
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="notToSay">Prefer Not to Say</option>
            </select>
          </motion.div>
        </div>
      </div>

      {/* Username Input */}
      <div className="relative">
        <motion.div whileHover={{ scale: 1.02 }} className="relative">
          <User size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            name="username"
            value={memberData.username}
            onChange={handleInputChange}
            className="w-full bg-gray-800 text-white pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
            placeholder="Username"
            required
          />
        </motion.div>
      </div>

      {/* Password Input */}
      <div className="relative">
        <motion.div whileHover={{ scale: 1.02 }} className="relative">
          <Lock size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="password"
            name="password"
            value={memberData.password}
            onChange={handleInputChange}
            className="w-full bg-gray-800 text-white pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
            placeholder="Password"
            required
          />
        </motion.div>
      </div>

      {/* Terms Checkbox */}
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="terms"
          checked={memberData.agreedToTerms}
          onChange={(e) =>
            setMemberData((prev) => ({ ...prev, agreedToTerms: e.target.checked }))
          }
          className="w-4 h-4 rounded border-gray-300 text-red-500 focus:ring-red-500"
          required
        />
        <label htmlFor="terms" className="text-gray-300 text-sm">
          I agree to the{" "}
          <a href="#" className="text-red-500 hover:text-red-400">
            Terms and Conditions
          </a>
        </label>
      </div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        disabled={loading}
        className={`w-full py-3 rounded-lg font-semibold shadow-lg transition-all ${
          loading
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-gradient-to-r from-red-700 to-red-500 text-white"
        }`}
      >
        {loading ? "Submitting..." : "Sign Up as Member"}
      </motion.button>

      {/* Error Message */}
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}

      {/* Success Message */}
      {success && (
        <p className="text-green-500 text-center mt-4">
          Registration Successful!
        </p>
      )}
    </form>
  );
};

export default MemberRegistrationForm;
