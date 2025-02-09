import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, User, Lock, ChevronRight, Zap, ArrowRight } from "lucide-react";
import Image_1 from "../assets/images/Bgs/SignInImg.jpg";

const SignInComponent = () => {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // For navigation

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(""); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (response.ok) {
        const {id, role } = data; // Assuming the backend sends back the role

        // Store user ID in localStorage
      localStorage.setItem("userId", id);

        // Navigate to the appropriate dashboard
        if (role === "ADMIN") navigate("/admin");
        else if (role === "MEMBER") navigate("/member");
        else if (role === "COACH") navigate("/coach");
        else setError("Unknown role detected. Please contact support.");
      } else {
        setError(data.message || "Login failed. Please try again.");
      }
    } catch (err) {
      setError("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex justify-center items-center">
      <div className="max-w-7xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {/* Image Container */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-red-600/30 to-black rounded-xl z-10" />
            <img
              src={Image_1}
              alt="Fitness Background"
              className="w-full h-full object-cover rounded-xl"
            />
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <div className="text-center">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="flex items-center justify-center gap-4 mb-6"
                >
                  <Zap size={32} className="text-red-500" />
                  <span className="text-red-500 tracking-widest font-semibold text-lg">
                    WELCOME BACK
                  </span>
                  <Zap size={32} className="text-red-500" />
                </motion.div>
                <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-red-500 bg-clip-text text-transparent">
                  Ready to Continue Your Journey?
                </h2>
              </div>
            </div>
          </motion.div>

          {/* Login Form Container */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-center px-4 lg:px-10"
          >
            <div className="w-full max-w-md">
              <motion.div
                className="bg-gray-900/60 border border-red-500/20 rounded-xl backdrop-blur-lg p-12"
              >
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="text-center mb-10">
                    <h3 className="text-4xl font-bold bg-gradient-to-r from-white to-red-500 bg-clip-text text-transparent">
                      Sign In
                    </h3>
                  </div>

                  {/* Username Input */}
                  <div className="relative">
                    <User size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      name="username"
                      value={loginData.username}
                      onChange={handleInputChange}
                      className="w-full bg-gray-800 text-white pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                      placeholder="Username"
                      autoComplete="username"
                    />
                  </div>

                  {/* Password Input */}
                  <div className="relative">
                    <Lock size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={loginData.password}
                      onChange={handleInputChange}
                      className="w-full bg-gray-800 text-white pl-10 pr-12 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                      placeholder="Password"
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>

                  {/* Error Message */}
                  <AnimatePresence>
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-red-500 text-sm text-center"
                      >
                        {error}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-red-700 to-red-500 text-white py-3 rounded-lg font-semibold shadow-lg shadow-red-500/30 flex items-center justify-center gap-2"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                      />
                    ) : (
                      <>
                        Sign In
                        <ArrowRight size={20} />
                      </>
                    )}
                  </motion.button>

                  {/* Sign Up Link */}
                  <motion.div
                    className="text-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    <span className="text-gray-400">
                      Don't have an account?{" "}
                    </span>
                    <Link
                      to="/signup"
                      className="text-red-500 font-semibold hover:text-red-400 transition-colors inline-flex items-center gap-1"
                    >
                      Sign up <ChevronRight size={16} />
                    </Link>
                  </motion.div>
                </form>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default SignInComponent;


