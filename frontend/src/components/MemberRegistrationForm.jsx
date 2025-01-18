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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!memberData.agreedToTerms) {
      alert("Please agree to the terms and conditions.");
      return;
    }
    console.log("Form Data Submitted:", memberData);
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
          />
        </motion.div>
      </div>

      {/* Terms Checkbox */}
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="terms"
          checked={memberData.agreedToTerms}
          onChange={(e) => setMemberData(prev => ({ ...prev, agreedToTerms: e.target.checked }))}
          className="w-4 h-4 rounded border-gray-300 text-red-500 focus:ring-red-500"
        />
        <label htmlFor="terms" className="text-gray-300 text-sm">
          I agree to the <a href="#" className="text-red-500 hover:text-red-400">Terms and Conditions</a>
        </label>
      </div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full bg-gradient-to-r from-red-700 to-red-500 text-white py-3 rounded-lg font-semibold shadow-lg shadow-red-500/30"
      >
        Sign Up as Member
      </motion.button>
    </form>
  );
};

export default MemberRegistrationForm;