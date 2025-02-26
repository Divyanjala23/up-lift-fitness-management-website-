import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Lock, Mail, Calendar, Users, Award, BookOpen, AlertCircle,CheckCircle } from "lucide-react";

const CoachRegistrationForm = () => {
  const [coachData, setCoachData] = useState({
    fullName: "",
    email: "",
    experience: "",
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
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCoachData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
    
    if (!coachData.experience) {
      newErrors.experience = "Years of experience is required";
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
    setSubmitError("");

    try {
      const response = await fetch("http://localhost:8080/api/coaches/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(coachData),
      });

      if (!response.ok) {
        throw new Error("Failed to register. Please try again.");
      }

      const data = await response.json();
      console.log("Registration Successful:", data);
      setSubmitSuccess(true);
    } catch (error) {
      console.error(error);
      setSubmitError(error.message || "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };
  

  // const InputField = ({ icon: Icon, error, ...props }) => (
  //   <div className="relative">
  //     <motion.div whileHover={{ scale: 1.02 }} className="relative">
  //       <Icon size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
  //       <input
  //         {...props}
  //         className={`w-full bg-gray-800 text-white pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 ${
  //           error ? 'ring-2 ring-red-500' : 'focus:ring-red-500'
  //         } transition-all`}
  //       />
  //     </motion.div>
  //     <AnimatePresence>
  //       {error && (
  //         <motion.span
  //           initial={{ opacity: 0, y: -10 }}
  //           animate={{ opacity: 1, y: 0 }}
  //           exit={{ opacity: 0, y: -10 }}
  //           className="text-red-500 text-sm mt-1 flex items-center gap-1"
  //         >
  //           <AlertCircle size={14} />
  //           {error}
  //         </motion.span>
  //       )}
  //     </AnimatePresence>
  //   </div>
  // );

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
      <div className="relative">
              <motion.div whileHover={{ scale: 1.02 }} className="relative">
                <User size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="fullName"
                  value={coachData.fullName}
                  onChange={handleInputChange}
                  className="w-full bg-gray-800 text-white pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                  placeholder="Full Name"
                  required
                />
              </motion.div>
            </div>
      

       <div className="relative">
              <motion.div whileHover={{ scale: 1.02 }} className="relative">
                <Mail size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={coachData.email}
                  onChange={handleInputChange}
                  className="w-full bg-gray-800 text-white pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                  placeholder="Email"
                  required
                />
              </motion.div>
            </div>
      

      <div className="grid grid-cols-2 gap-4">
        <div className="relative">
              <motion.div whileHover={{ scale: 1.02 }} className="relative">
                <Mail size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="number"
                  name="experience"
                  value={coachData.experience}
                  onChange={handleInputChange}
                  className="w-full bg-gray-800 text-white pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                  placeholder="Experiance"
                  required
                />
              </motion.div>
            </div>
        
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
                <div className="relative">
                  <motion.div whileHover={{ scale: 1.02 }} className="relative">
                    <Calendar size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="number"
                      name="age"
                      value={coachData.age}
                      onChange={handleInputChange}
                      className="w-full bg-gray-800 text-white pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                      placeholder="Age"
                      required
                    />
                  </motion.div>
                </div>
        
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
<div className="relative">
        <motion.div whileHover={{ scale: 1.02 }} className="relative">
          <User size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            name="username"
            value={coachData.username}
            onChange={handleInputChange}
            className="w-full bg-gray-800 text-white pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
            placeholder="Username"
            required
          />
        </motion.div>
      </div>

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

      {submitError && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="text-red-500 text-sm text-center flex items-center justify-center gap-1"
        >
          <AlertCircle size={14} />
          {submitError}
        </motion.div>
      )}

      {submitSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-green-500 text-sm text-center flex items-center justify-center gap-1"
        >
          <CheckCircle size={14} />
          Registration Successful!
        </motion.div>
      )}
    </form>
  );
};

export default CoachRegistrationForm;