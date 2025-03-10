import React, { useState } from "react";
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

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const ProtectedRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/signin" />;
  };

  // Wrapper component to conditionally render Navbar
  const Layout = ({ children }) => {
    const location = useLocation();
    const isDashboardRoute =
      location.pathname.startsWith("/admin") ||
      location.pathname.startsWith("/member") ||
      location.pathname.startsWith("/coach");

    return (
      <>
        {!isDashboardRoute && <Navbar isAuthenticated={isAuthenticated} />}
        {children}
        {!isDashboardRoute && <Footer />}
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
        <Route
          path="/signin"
          element={<SignInComponent onLogin={handleLogin} />}
        />
        <Route
          path="/signup"
          element={<SignUpComponent onLogin={handleLogin} />}
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