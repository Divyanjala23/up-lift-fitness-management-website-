import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import BMICalculator from './components/BMICalculator';
import Signup from './components/Signup';
import Slider from './components/Slider';
import Login from './components/Login';
import Forum from './components/Forum';
import About from './components/About';
<<<<<<< HEAD
import Service from './components/service';
// import Dashboard from './components/Dashboard';
=======
import AdminDashboard from './components/AdminDashboard';
import CoachDashboard from './components/CoachDashboard';
import MemberDashboard from './components/MemberDashboard';

// Mock authentication check
const isAuthenticated = () => {
  return localStorage.getItem('userRole') !== null; // Check if userRole exists in localStorage
};

// PrivateRoute Component for role-based access
const PrivateRoute = ({ children, role }) => {
  const userRole = localStorage.getItem('userRole'); // Get user role from localStorage

  if (!isAuthenticated()) {
    return <Navigate to="/login" />; // Redirect to login if not authenticated
  }

  if (role && userRole !== role) {
    return <Navigate to="/" />; // Redirect if user role doesn't match
  }

  return children; // Render the children if authenticated and authorized
};

// Conditional Header Component
const ConditionalHeader = () => {
  const location = useLocation(); // Get the current route path

  // If the path matches one of the dashboard routes, don't show the Header
  if (location.pathname.startsWith('/admin/dashboard') || 
      location.pathname.startsWith('/coach/dashboard') || 
      location.pathname.startsWith('/member/dashboard')) {
    return null; // Do not render Header for dashboard pages
  }

  return <Header />; // Render Header for other pages
};
>>>>>>> e57444e9d79b3f44bd9039bf82ca43e93ebaf546

function App() {
  return (
    <Router>
      {/* Conditionally render Header based on route */}
      <ConditionalHeader />
      <Routes>
<<<<<<< HEAD
        <Route path="/" element={<div><Slider /><BMICalculator /><Service/><Footer /></div>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/forum" element={<div><Forum /></div>}/>
        <Route path="/about" element={<div><About /></div>}/>
        <Route path="/service" element={<div><Service /></div>}/>
        {/* <Route path="/dashboard" element={<div><Dashboard /></div>}/> */}
        
=======
        {/* Public Routes */}
        <Route path="/" element={<div><Slider /><BMICalculator /><Footer /></div>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forum" element={<div><Forum /></div>} />
        <Route path="/about" element={<div><About /></div>} />
>>>>>>> e57444e9d79b3f44bd9039bf82ca43e93ebaf546

        {/* Protected Routes for Dashboards */}
        <Route
          path="/admin/dashboard"
          element={
            <PrivateRoute role="ADMIN">
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/coach/dashboard"
          element={
            <PrivateRoute role="COACH">
              <CoachDashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/member/dashboard"
          element={
            <PrivateRoute role="MEMBER">
              <MemberDashboard />
            </PrivateRoute>
          }
        />
      </Routes>
      
    </Router>
  );
}

export default App;
