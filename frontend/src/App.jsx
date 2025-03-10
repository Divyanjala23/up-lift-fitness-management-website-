import { useState } from "react";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

// Components
import Navbar from "./components/NavbarComponent";
import HeroComponent from "./components/HeroComponent";
import BMICalculatorComponent from "./components/BMICalculatorComponent";
import About from "./components/About";
import SIgnUpComponent from "./components/SIgnUpComponent";
import SignInComponent from "./components/SignInComponent";
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

  ProtectedRoute.propTypes = {
    element: PropTypes.element.isRequired,
  };

  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={
            <>
              <HeroComponent />
              <BMICalculatorComponent />
              <Footer />
            </>
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/services" element={<Services />} />
        <Route
          path="/signup"
          element={<SIgnUpComponent onLogin={handleLogin} />}
        />
        <Route
          path="/signin"
          element={<SignInComponent onLogin={handleLogin} />}
        />

        {/* Protected Routes */}
        <Route
          path="/community"
          element={<ProtectedRoute element={<CommunityForum />} />}
        />
        <Route
          path="/schedule"
          element={
            <ProtectedRoute
              element={
                <>
                  <Schedule />
                  <Footer />
                </>
              }
            />
          }
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