import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  const [animateIn, setAnimateIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Trigger animations after component mounts
    setAnimateIn(true);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
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
        const { id, role } = data;
        localStorage.setItem("userId", id);

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
              <span className="text-xl font-bold tracking-wider text-white"></span>
            </div>
          </div>
        </div>
      </header>

      <div className="relative z-10 flex-1 pt-8">
        <div className="container mx-auto max-w-7xl px-4 py-8 md:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
            {/* Left side - Image and Inspirational content */}
            <div
              className={`relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 to-black p-8 lg:p-12 border border-red-500/20 shadow-lg shadow-red-500/5 h-full flex flex-col justify-center transition-all duration-700 ${
                animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-60 h-60 bg-red-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-60 h-60 bg-red-500/5 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3"></div>
              
              {/* Background image with darker overlay */}
              <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-black/80 z-10"></div>
                <img
                  src={Image_1}
                  alt="Fitness Background"
                  className="w-full h-full object-cover opacity-50"
                />
              </div>

              {/* Content */}
              <div className="relative z-10">
                <div className="mb-8 inline-flex items-center justify-center rounded-full bg-red-500/10 px-4 py-2 text-red-500">
                  <Zap size={18} className="mr-2" />
                  <span className="text-lg font-semibold tracking-wider">
                    WELCOME BACK
                  </span>
                </div>

                <h1 className="mb-6 text-4xl font-bold text-white md:text-5xl xl:text-6xl">
                  Ready to <span className="text-red-500 relative">Continue</span><br />
                  Your <span className="text-red-500 relative">Journey</span> ?
                </h1>

                <p className="mb-10 text-xl text-gray-300 max-w-lg">
                  Sign in to access your personalized fitness program and track your progress.
                </p>

                <div className="space-y-6">
                  {/* Testimonial or feature highlight */}
                  <div 
                    className={`group flex items-start space-x-4 rounded-xl border border-red-500/20 bg-black/60 p-5 backdrop-blur-sm transition-all duration-300 hover:border-red-500/40 hover:bg-black/70 ${
                      animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                    }`}
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-500/10 text-red-500 transition-all duration-300 group-hover:bg-red-500/20">
                      <User size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white text-lg">Member Benefits</h3>
                      <p className="text-gray-400">Access your training plans, nutrition guides, and progress tracking all in one place.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Login Form */}
            <div
              className={`relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 to-black p-8 lg:p-12 border border-red-500/20 shadow-lg shadow-red-500/5 h-full flex flex-col justify-center transition-all duration-700 ${
                animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <div className="w-full max-w-md mx-auto">
                <div className="mb-8 text-center">
                  <h2 className="text-3xl font-bold text-white">
                    Sign In
                  </h2>
                  <p className="mt-3 text-gray-400">
                    Continue your fitness journey today
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Username Input */}
                  <div className="relative">
                    <User size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      name="username"
                      value={loginData.username}
                      onChange={handleInputChange}
                      className="w-full bg-black/40 text-white pl-10 pr-4 py-3.5 rounded-xl border border-red-500/20 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 transition-all"
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
                      className="w-full bg-black/40 text-white pl-10 pr-12 py-3.5 rounded-xl border border-red-500/20 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/50 transition-all"
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

                  {/* Remember me and forgot password */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 rounded bg-gray-800 border-gray-700 text-red-600 focus:ring-red-500"
                      />
                      <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-400">
                        Remember me
                      </label>
                    </div>
                    <div className="text-sm">
                      <a href="#" className="text-red-500 hover:text-red-400 font-medium">
                        Forgot password?
                      </a>
                    </div>
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="text-red-500 text-sm text-center border border-red-500/20 bg-red-500/10 py-2 px-3 rounded-lg">
                      {error}
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-red-700 to-red-500 text-white py-3.5 rounded-xl font-semibold shadow-lg shadow-red-500/30 flex items-center justify-center gap-2 hover:from-red-600 hover:to-red-400 transition-all duration-300"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <>
                        Sign In
                        <ArrowRight size={20} />
                      </>
                    )}
                  </button>

                  {/* Sign Up Link */}
                  <div className="mt-8 pt-6 text-center border-t border-gray-800">
                    <span className="text-gray-400">
                      Don&apos;t have an account?{" "}
                    </span>
                    <Link
                      to="/signup"
                      className="inline-flex items-center gap-1 font-semibold text-red-500 transition-colors hover:text-red-400"
                    >
                      Sign up <ChevronRight size={16} />
                    </Link>
                  </div>
                </form>
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

export default SignInComponent;