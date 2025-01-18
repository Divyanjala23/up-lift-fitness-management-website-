import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, User, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

import MemberRegistrationForm from "./MemberRegistrationForm";
import CoachRegistrationForm from "./CoachRegistrationForm";

const SignUpComponent = () => {
  const [activeTab, setActiveTab] = useState("member");

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="max-w-7xl mx-auto px-8 w-full">
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
              src="/api/placeholder/800/600"
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
                    JOIN US TODAY
                  </span>
                  <Zap size={32} className="text-red-500" />
                </motion.div>
                <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-red-500 bg-clip-text text-transparent">
                  Start Your Fitness Journey
                </h2>
                <p className="text-gray-300 text-lg max-w-md mx-auto">
                  Join our community and transform your life with expert guidance
                </p>
              </div>
            </div>
          </motion.div>

          {/* Registration Form Container */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-center px-4 lg:px-10"
          >
            <div className="w-full max-w-md">
              <motion.div
                className="bg-gray-900/60 border border-red-500/20 rounded-xl backdrop-blur-lg p-8"
              >
                <div className="text-center mb-8">
                  <h3 className="text-4xl font-bold bg-gradient-to-r from-white to-red-500 bg-clip-text text-transparent">
                    Sign Up
                  </h3>
                </div>

                {/* Custom Tabs */}
                <div className="mb-8">
                  <div className="flex space-x-2 bg-gray-800 p-1 rounded-lg">
                    {["member", "coach"].map((tab) => (
                      <motion.button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-md transition-colors ${
                          activeTab === tab
                            ? "bg-gradient-to-r from-red-700 to-red-500 text-white"
                            : "text-gray-400 hover:text-white"
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <User size={18} />
                        <span className="capitalize">{tab}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Form Content */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    {activeTab === "member" ? (
                      <MemberRegistrationForm />
                    ) : (
                      <CoachRegistrationForm />
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Sign In Link */}
                <motion.div
                  className="text-center mt-6"
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="text-gray-400">Already have an account? </span>
                  <Link
                    to="/signin"
                    className="text-red-500 font-semibold hover:text-red-400 transition-colors inline-flex items-center gap-1"
                  >
                    Sign in <ChevronRight size={16} />
                  </Link>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default SignUpComponent;