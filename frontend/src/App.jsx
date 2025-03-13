import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from "react-router-dom";

import Navbar from "./components/NavbarComponent";
import HeroComponent from "./components/HeroComponent";
import BMICalculatorComponent from "./components/BMICalculatorComponent";
import About from "./components/About";
import SignInComponent from "./components/SignInComponent";
import SignUpComponent from "./components/SignUpComponent";
import CommunityForum from "./components/CommunityForum";
import ContactUs from "./components/ContactUs";
import Services from "./components/Services";
import Shedule from "./components/Shedule";
import Footer from "./components/Footer";
import AdminDashboard from "./components/AdminDashboard";
import MemberDashboard from "./components/MemberDashboard";
import CoachDashboard from "./components/CoachDashboard";
import PaymentGateway from "./components/PaymentGateway";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", "true");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
  };

  const ProtectedRoute = ({ element }) => {
    if (!isAuthenticated) {
      console.log("User not authenticated, redirecting to /signin");
      return <Navigate to="/signin" />;
    }
    console.log("User authenticated, rendering protected component");
    return element;
  };

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
              <SignInComponent onLogin={handleLogin} />
            </Layout>
          }
        />
        <Route
          path="/signup"
          element={
            <Layout includeNavbar={true}>
              <SignUpComponent onLogin={handleLogin} />
            </Layout>
          }
        />

        {/* Protected Routes */}
        <Route
          path="/community"
          element={
            <Layout>
              <ProtectedRoute element={<CommunityForum />} />
            </Layout>
          }
        />
        <Route
          path="/shedule"
          element={
            <Layout>
              <ProtectedRoute element={<Shedule />} />
            </Layout>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute element={<AdminDashboard />} />
          }
        />
        <Route
          path="/member"
          element={
            <ProtectedRoute element={
              <Layout includeNavbar={false}>
                <MemberDashboard />
              </Layout>
            } />
          }
        />
        <Route
          path="/coach"
          element={
            <ProtectedRoute element={<CoachDashboard />} />
          }
        />
        <Route
          path="/payment"
          element={
            <ProtectedRoute element={<PaymentGateway />} />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;