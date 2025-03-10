import { useState, useEffect } from "react";
import { User, ChevronRight, Zap, Dumbbell, Target, BarChart } from "lucide-react";
import { Link } from "react-router-dom";

import MemberRegistrationForm from "./MemberRegistrationForm";
import CoachRegistrationForm from "./CoachRegistrationForm";

const SignUpComponent = () => {
  const [activeTab, setActiveTab] = useState("member");
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    // Trigger animations after component mounts
    setAnimateIn(true);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      {/* Animated background elements */}
      <div className="fixed inset-0 z-0 opacity-20">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-red-500 blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-red-700 blur-3xl"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 py-10 border-b border-red-500/20 backdrop-blur-sm">
        <div className="container mx-auto max-w-7xl px-4 md:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-wider text-white">
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="relative z-10 flex-1 pt-8">
        <div className="container mx-auto max-w-7xl px-4 py-8 md:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
            {/* Left side - Inspirational content */}
            <div
              className={`relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 to-black p-8 lg:p-12 border border-red-500/20 shadow-lg shadow-red-500/5 h-full flex flex-col justify-center transition-all duration-700 ${
                animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-60 h-60 bg-red-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-60 h-60 bg-red-500/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3"></div>

              {/* Content */}
              <div className="relative z-10">
                <div className="mb-8 inline-flex items-center justify-center rounded-full bg-red-500/10 px-4 py-2 text-red-500">
                  <Zap size={18} className="mr-2" />
                  <span className="text-lg font-semibold tracking-wider">
                    UNLEASH YOUR POTENTIAL
                  </span>
                </div>

                <h1 className="mb-6 text-4xl font-bold text-white md:text-5xl xl:text-6xl">
                  Transform Your <span className="text-red-500 relative">Body</span>.<br />
                  Elevate Your <span className="text-red-500 relative">Life</span>.
                </h1>

                <p className="mb-10 text-xl text-gray-300 max-w-lg">
                  Join our elite community of fitness enthusiasts and get personalized coaching to crush your goals.
                </p>

                <div className="space-y-6">
                  {/* Feature cards */}
                  {[
                    { icon: Dumbbell, title: "Expert Coaches", description: "Train with certified fitness professionals" },
                    { icon: Target, title: "Custom Plans", description: "Get workouts tailored specifically to your goals" },
                    { icon: BarChart, title: "Track Progress", description: "Monitor your improvements with advanced analytics" },
                  ].map((feature, index) => (
                    <div
                      key={index}
                      className={`group flex items-start space-x-4 rounded-xl border border-red-500/20 bg-black/40 p-5 backdrop-blur-sm transition-all duration-300 hover:border-red-500/40 hover:bg-black/60 hover:shadow-md hover:shadow-red-500/5 ${
                        animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                      }`}
                      style={{ transitionDelay: `${index * 150}ms` }}
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-500/10 text-red-500 transition-all duration-300 group-hover:bg-red-500/20">
                        <feature.icon size={24} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white text-lg">{feature.title}</h3>
                        <p className="text-gray-400">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right side - Sign up form */}
            <div
              className={`relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 to-black p-8 lg:p-12 border border-red-500/20 shadow-lg shadow-red-500/5 h-full flex flex-col justify-center transition-all duration-700 ${
                animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <div className="w-full max-w-md mx-auto">
                <div className="mb-8 text-center">
                  <h2 className="text-3xl font-bold text-white">
                    Create Account
                  </h2>
                  <p className="mt-3 text-gray-400">
                    Begin your transformation journey today
                  </p>
                </div>

                {/* Tabs */}
                <div className="mb-8">
                  <div className="flex rounded-xl bg-black/40 p-1.5">
                    {["member", "coach"].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-3.5 font-medium transition-all duration-300 ${
                          activeTab === tab
                            ? "bg-red-600 text-white shadow-md"
                            : "text-gray-400 hover:text-white"
                        }`}
                      >
                        <User size={18} />
                        <span className="capitalize">{tab}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Form Content */}
                <div key={activeTab} className="min-h-64">
                  {activeTab === "member" ? (
                    <MemberRegistrationForm />
                  ) : (
                    <CoachRegistrationForm />
                  )}
                </div>

                {/* Sign In Link */}
                <div className="mt-8 pt-6 text-center border-t border-gray-800">
                  <span className="text-gray-400">
                    Already a member?{" "}
                  </span>
                  <Link
                    to="/signin"
                    className="inline-flex items-center gap-1 font-semibold text-red-500 transition-colors hover:text-red-400"
                  >
                    Sign in <ChevronRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer className="relative z-10 border-t border-red-500/10 py-6 mt-12">
        <div className="container mx-auto max-w-7xl px-4 md:px-8">
          <div className="flex flex-col items-center justify-between gap-4 text-gray-500 md:flex-row">
            <div className="flex items-center gap-2">
              <Zap size={18} className="text-red-500" />
              <span className="font-medium">UPLIFT</span>
            </div>
            <div className="text-sm">
              © {new Date().getFullYear()} All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SignUpComponent;