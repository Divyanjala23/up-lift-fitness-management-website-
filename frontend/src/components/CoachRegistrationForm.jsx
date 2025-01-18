import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Lock, Mail, Calendar, Users, Award, BookOpen, AlertCircle } from "lucide-react";

const CoachRegistrationForm = () => {
  const [coachData, setCoachData] = useState({
    fullName: "",
    email: "",
    yearsInExperience: "",
    specialization: "",
    age: "",
    gender: "",
    username: "",
    password: "",
    agreedToTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCoachData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!coachData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }
    
    if (!coachData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(coachData.email)) {
      newErrors.email = "Email is invalid";
    }
    
    if (!coachData.yearsInExperience) {
      newErrors.yearsInExperience = "Years of experience is required";
    }
    
    if (!coachData.specialization) {
      newErrors.specialization = "Specialization is required";
    }
    
    if (!coachData.age) {
      newErrors.age = "Age is required";
    } else if (coachData.age < 18) {
      newErrors.age = "Must be at least 18 years old";
    }
    
    if (!coachData.gender) {
      newErrors.gender = "Gender is required";
    }
    
    if (!coachData.username.trim()) {
      newErrors.username = "Username is required";
    }
    
    if (!coachData.password) {
      newErrors.password = "Password is required";
    } else if (coachData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!coachData.agreedToTerms) {
      newErrors.agreedToTerms = "You must agree to the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log("Form Data Submitted:", coachData);
      // Add your API call here
    } catch (error) {
      setErrors({ submit: "Failed to submit form. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const InputField = ({ icon: Icon, error, ...props }) => (
    <div className="relative">
      <motion.div whileHover={{ scale: 1.02 }} className="relative">
        <Icon size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          {...props}
          className={`w-full bg-gray-800 text-white pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 ${
            error ? 'ring-2 ring-red-500' : 'focus:ring-red-500'
          } transition-all`}
        />
      </motion.div>
      <AnimatePresence>
        {error && (
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-red-500 text-sm mt-1 flex items-center gap-1"
          >
            <AlertCircle size={14} />
            {error}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );

  const SelectField = ({ icon: Icon, error, label, options, ...props }) => (
    <div className="relative">
      <motion.div whileHover={{ scale: 1.02 }} className="relative">
        <Icon size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <select
          {...props}
          className={`w-full bg-gray-800 text-white pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 ${
            error ? 'ring-2 ring-red-500' : 'focus:ring-red-500'
          } transition-all appearance-none`}
        >
          <option value="">{label}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </motion.div>
      <AnimatePresence>
        {error && (
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-red-500 text-sm mt-1 flex items-center gap-1"
          >
            <AlertCircle size={14} />
            {error}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <InputField
        icon={User}
        type="text"
        name="fullName"
        value={coachData.fullName}
        onChange={handleInputChange}
        placeholder="Full Name"
        error={errors.fullName}
      />

      <InputField
        icon={Mail}
        type="email"
        name="email"
        value={coachData.email}
        onChange={handleInputChange}
        placeholder="Email"
        error={errors.email}
      />

      <div className="grid grid-cols-2 gap-4">
        <InputField
          icon={Award}
          type="number"
          name="yearsInExperience"
          value={coachData.yearsInExperience}
          onChange={handleInputChange}
          placeholder="Years of Experience"
          error={errors.yearsInExperience}
        />
        
        <SelectField
          icon={BookOpen}
          name="specialization"
          value={coachData.specialization}
          onChange={handleInputChange}
          label="Select Specialization"
          error={errors.specialization}
          options={[
            { value: "Sports_Specific_Training", label: "Sports-Specific Training" },
            { value: "Cardio_Training", label: "Cardio Training" },
            { value: "Strength_and_Conditioning", label: "Strength and Conditioning" },
            { value: "Yoga_and_Flexibility_Training", label: "Yoga and Flexibility" },
            { value: "Weight_Loss_Coaching", label: "Weight Loss Coaching" }
          ]}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <InputField
          icon={Calendar}
          type="number"
          name="age"
          value={coachData.age}
          onChange={handleInputChange}
          placeholder="Age"
          error={errors.age}
        />
        
        <SelectField
          icon={Users}
          name="gender"
          value={coachData.gender}
          onChange={handleInputChange}
          label="Select Gender"
          error={errors.gender}
          options={[
            { value: "male", label: "Male" },
            { value: "female", label: "Female" },
            { value: "notToSay", label: "Prefer Not to Say" }
          ]}
        />
      </div>

      <InputField
        icon={User}
        type="text"
        name="username"
        value={coachData.username}
        onChange={handleInputChange}
        placeholder="Username"
        error={errors.username}
      />

      <div className="relative">
        <motion.div whileHover={{ scale: 1.02 }} className="relative">
          <Lock size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={coachData.password}
            onChange={handleInputChange}
            className={`w-full bg-gray-800 text-white pl-10 pr-12 py-3 rounded-lg focus:outline-none focus:ring-2 ${
              errors.password ? 'ring-2 ring-red-500' : 'focus:ring-red-500'
            } transition-all`}
            placeholder="Password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </motion.div>
        {errors.password && (
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-red-500 text-sm mt-1 flex items-center gap-1"
          >
            <AlertCircle size={14} />
            {errors.password}
          </motion.span>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="terms"
          checked={coachData.agreedToTerms}
          onChange={(e) => {
            setCoachData(prev => ({ ...prev, agreedToTerms: e.target.checked }));
            if (errors.agreedToTerms) {
              setErrors(prev => ({ ...prev, agreedToTerms: "" }));
            }
          }}
          className="w-4 h-4 rounded border-gray-300 text-red-500 focus:ring-red-500"
        />
        <label htmlFor="terms" className="text-gray-300 text-sm">
          I agree to the{" "}
          <a href="#" className="text-red-500 hover:text-red-400">
            Terms and Conditions
          </a>
        </label>
      </div>
      {errors.agreedToTerms && (
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="text-red-500 text-sm flex items-center gap-1"
        >
          <AlertCircle size={14} />
          {errors.agreedToTerms}
        </motion.span>
      )}

      {/* Submit Button */}
      <motion.button
        type="submit"
        disabled={isSubmitting}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full bg-gradient-to-r from-red-700 to-red-500 text-white py-3 rounded-lg font-semibold shadow-lg shadow-red-500/30 flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity }}
              className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
            />
            <span>Signing Up...</span>
          </>
        ) : (
          "Sign Up as Coach"
        )}
      </motion.button>

      {errors.submit && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="text-red-500 text-sm text-center flex items-center justify-center gap-1"
        >
          <AlertCircle size={14} />
          {errors.submit}
        </motion.div>
      )}
    </form>
  );
};

export default CoachRegistrationForm;