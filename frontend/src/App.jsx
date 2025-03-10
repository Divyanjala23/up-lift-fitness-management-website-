import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from "react-router-dom";

import Navbar from "./components/NavbarComponent";
import HeroComponent from "./components/HeroComponent";
import BMICalculatorComponent from "./components/BMICalculatorComponent";
import About from "./components/About";
import SignInComponent from "./components/SignInComponent";
import SignUpComponent from "./components/SIgnUpComponent";
import CommunityForum from "./components/CommunityForum";
import ContactUs from "./components/ContactUs";
import Services from "./components/Services";
import Schedule from "./components/Shedule";
import Footer from "./components/Footer";
import AdminDashboard from "./components/AdminDashboard";
import MemberDashboard from "./components/MemberDashboard";
import CoachDashboard from "./components/CoachDashboard";
import PaymentGateway from "./components/PaymentGateway";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if the user is authenticated on app load
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem("authToken", "dummy-token"); // Store a token in localStorage
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("authToken"); // Remove the token on logout
  };

  const ProtectedRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/signin" />;
  };

  const PublicRoute = ({ element }) => {
    return isAuthenticated ? <Navigate to="/" /> : element;
  };

  // Wrapper component to conditionally render Navbar
  const Layout = ({ children, includeNavbar = true }) => {
    const location = useLocation();
    const isDashboardRoute =
      location.pathname.startsWith("/admin") ||
      location.pathname.startsWith("/member") ||
      location.pathname.startsWith("/coach");

    return (
      <>
        {includeNavbar && !isDashboardRoute && <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />}
        {children}
        {includeNavbar && !isDashboardRoute && <Footer />}
      </>
    );
  };

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={
            <Layout>
              <HeroComponent />
              <BMICalculatorComponent />
            </Layout>
          }
        />
        <Route
          path="/about"
          element={
            <Layout>
              <About />
            </Layout>
          }
        />
        <Route
          path="/contact"
          element={
            <Layout>
              <ContactUs />
            </Layout>
          }
        />
        <Route
          path="/services"
          element={
            <Layout>
              <Services />
            </Layout>
          }
        />

        {/* SignIn and SignUp routes where Navbar should always be visible */}
        <Route
          path="/signin"
          element={
            <Layout includeNavbar={true}>
              <PublicRoute element={<SignInComponent onLogin={handleLogin} />} />
            </Layout>
          }
        />
        <Route
          path="/signup"
          element={
            <Layout includeNavbar={true}>
              <PublicRoute element={<SignUpComponent onLogin={handleLogin} />} />
            </Layout>
          }
        />

        {/* Protected Routes */}
        <Route
          path="/community"
          element={<ProtectedRoute element={<CommunityForum />} />}
        />
        <Route
          path="/schedule"
          element={<ProtectedRoute element={<Schedule />} />}
        />
        <Route
          path="/admin"
          element={<ProtectedRoute element={<AdminDashboard />} />}
        />
        <Route
          path="/member"
          element={<ProtectedRoute element={<MemberDashboard />} />}
        />
        <Route
          path="/coach"
          element={<ProtectedRoute element={<CoachDashboard />} />}
        />
        <Route
          path="/payment"
          element={<ProtectedRoute element={<PaymentGateway />} />}
        />
      </Routes>
    </Router>
  );
};

export default App;