import React from "react";
import Navbar from "./components/NavbarComponent";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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
import PaymentGateway from "./components/PaymentGateway";
import CoachDashboard from "./components/CoachDashboard";


const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <Navbar />
                <HeroComponent />
                <BMICalculatorComponent />
                <Footer/>
              </div>
            }
          />
          <Route
            path="/about"
            element={
              <>
                <Navbar />
                <About />
              </>
            }
          />
          <Route
            path="/contact"
            element={
              <>
                <Navbar />
                <ContactUs />
              </>
            }
          />
          <Route
            path="/signup"
            element={
              <>
                <Navbar />
                <SIgnUpComponent />
              </>
            }
          />
          <Route
            path="/signin"
            element={
              <>
                <Navbar />
                <SignInComponent />
              </>
            }
          />
          <Route
            path="/services"
            element={
              <>
                <Navbar />
                <Services />
              </>
            }
          />
          <Route
            path="/community"
            element={
              <>
                <Navbar />
                <CommunityForum />
              </>
            }
          />
          <Route
            path="/schedule"
            element={
              <>
                <Navbar />
                <Schedule />
              </> 
            }
          />
          <Route
            path="api/admin"
            element={
              <>
                <AdminDashboard/>
              </>
            }
          />
          <Route
            path="api/members"
            element={
              <>
                <MemberDashboard/>
              </>
            }
          />
          <Route
            path="api/coaches"
            element={
              <>
                <CoachDashboard/>
              </>
            }
          />
          
        </Routes>
      </Router>
    </>
  );
};

export default App;