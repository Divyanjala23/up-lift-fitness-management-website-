import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, User, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

import MemberRegistrationForm from "./MemberRegistrationForm";
import CoachRegistrationForm from "./CoachRegistrationForm";

const SignUpComponent = () => {
  const [activeTab, setActiveTab] = useState("member");

  return (
    <div className="flex min-h-screen items-center justify-center bg-black py-10 text-white">
      <div className="mx-auto w-full max-w-7xl px-8 py-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 gap-5 lg:grid-cols-2"
        >
          {/* Image Container */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="absolute inset-0 z-10 rounded-xl bg-gradient-to-r from-black/80 via-red-600/30 to-black" />
            {/* <img
              src="/api/placeholder/800/600"
              alt="Fitness Background"
              className="h-full w-full rounded-xl object-cover"
            /> */}
            <div className="absolute inset-0 z-20 flex items-center justify-center">
              <div className="text-center">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="mb-6 flex items-center justify-center gap-4"
                >
                  <Zap size={32} className="text-red-500" />
                  <span className="text-lg font-semibold tracking-widest text-red-500">
                    JOIN US TODAY
                  </span>
                  <Zap size={32} className="text-red-500" />
                </motion.div>
                <h2 className="mb-4 bg-gradient-to-r from-white to-red-500 bg-clip-text text-5xl font-bold text-transparent">
                  Start Your Fitness Journey
                </h2>
                <p className="mx-auto max-w-md text-lg text-gray-300">
                  Join our community and transform your life with expert
                  guidance
                </p>
              </div>
            </div>
          </motion.div>

          {/* Registration Form Container */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-center px-4 lg:px-8"
          >
            <div className="w-full">
              <motion.div className="rounded-xl border border-red-500/20 bg-gray-900/60 p-8 backdrop-blur-lg">
                <div className="mb-8 text-center">
                  <h3 className="bg-gradient-to-r from-white to-red-500 bg-clip-text text-4xl font-bold text-transparent">
                    Sign Up
                  </h3>
                </div>

                {/* Custom Tabs */}
                <div className="mb-8">
                  <div className="flex space-x-2 rounded-lg bg-gray-800 p-1">
                    {["member", "coach"].map((tab) => (
                      <motion.button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`flex flex-1 items-center justify-center gap-2 rounded-md py-3 transition-colors ${
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
                  className="mt-6 text-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="text-gray-400">
                    Already have an account?{" "}
                  </span>
                  <Link
                    to="/signin"
                    className="inline-flex items-center gap-1 font-semibold text-red-500 transition-colors hover:text-red-400"
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
