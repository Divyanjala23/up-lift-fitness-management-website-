import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import {  Menu, X } from "lucide-react";
import { navbarContent } from '../const';

const NavbarComponent = ({ isAuthenticated, onLogout }) => {
  const [openNav, setOpenNav] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle resize
  useEffect(() => {
    const handleResize = () => window.innerWidth >= 960 && setOpenNav(false);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    },
  };

  const linkVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 100,
      },
    }),
  };

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        when: "afterChildren",
      },
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const menuItemVariants = {
    closed: { x: -20, opacity: 0 },
    open: { x: 0, opacity: 1 },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={navVariants}
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/95 backdrop-blur-lg shadow-lg shadow-red-500/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <nav className="flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <Link to="/">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <img src={navbarContent.logo} className="w-36" alt="logo" />
              <motion.div
                className="absolute -inset-2 bg-red-500 opacity-20 blur-lg rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {/* Always show these links */}
            <motion.div custom={0} variants={linkVariants} initial="hidden" animate="visible">
              <Link
                to="/"
                className={`relative group py-2 text-lg font-medium transition-colors duration-300 ${
                  location.pathname === "/"
                    ? "text-red-500"
                    : "text-white hover:text-red-400"
                }`}
              >
                <span className="relative z-10">Home</span>
                <motion.span
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-red-500 rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{
                    scaleX: location.pathname === "/" ? 1 : 0,
                  }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </motion.div>
            <motion.div custom={1} variants={linkVariants} initial="hidden" animate="visible">
              <Link
                to="/about"
                className={`relative group py-2 text-lg font-medium transition-colors duration-300 ${
                  location.pathname === "/about"
                    ? "text-red-500"
                    : "text-white hover:text-red-400"
                }`}
              >
                <span className="relative z-10">About</span>
                <motion.span
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-red-500 rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{
                    scaleX: location.pathname === "/about" ? 1 : 0,
                  }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </motion.div>
            <motion.div custom={2} variants={linkVariants} initial="hidden" animate="visible">
              <Link
                to="/contact"
                className={`relative group py-2 text-lg font-medium transition-colors duration-300 ${
                  location.pathname === "/contact"
                    ? "text-red-500"
                    : "text-white hover:text-red-400"
                }`}
              >
                <span className="relative z-10">Contact</span>
                <motion.span
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-red-500 rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{
                    scaleX: location.pathname === "/contact" ? 1 : 0,
                  }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </motion.div>
            <motion.div custom={3} variants={linkVariants} initial="hidden" animate="visible">
              <Link
                to="/services"
                className={`relative group py-2 text-lg font-medium transition-colors duration-300 ${
                  location.pathname === "/services"
                    ? "text-red-500"
                    : "text-white hover:text-red-400"
                }`}
              >
                <span className="relative z-10">Services</span>
                <motion.span
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-red-500 rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{
                    scaleX: location.pathname === "/services" ? 1 : 0,
                  }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </motion.div>

            {/* Conditionally render Schedule and Community links for authenticated users */}
            {isAuthenticated && (
              <>
                <motion.div custom={4} variants={linkVariants} initial="hidden" animate="visible">
                  <Link
                    to="/community"
                    className={`relative group py-2 text-lg font-medium transition-colors duration-300 ${
                      location.pathname === "/community"
                        ? "text-red-500"
                        : "text-white hover:text-red-400"
                    }`}
                  >
                    <span className="relative z-10">Community</span>
                    <motion.span
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-red-500 rounded-full"
                      initial={{ scaleX: 0 }}
                      animate={{
                        scaleX: location.pathname === "/community" ? 1 : 0,
                      }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                </motion.div>
                <motion.div custom={5} variants={linkVariants} initial="hidden" animate="visible">
                  <Link
                    to="/schedule"
                    className={`relative group py-2 text-lg font-medium transition-colors duration-300 ${
                      location.pathname === "/schedule"
                        ? "text-red-500"
                        : "text-white hover:text-red-400"
                    }`}
                  >
                    <span className="relative z-10">Schedule</span>
                    <motion.span
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-red-500 rounded-full"
                      initial={{ scaleX: 0 }}
                      animate={{
                        scaleX: location.pathname === "/schedule" ? 1 : 0,
                      }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                </motion.div>
              </>
            )}
          </div>

          {/* Action Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            {isAuthenticated ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onLogout}
                className="px-6 py-2.5 text-white border border-red-500/30 rounded-full hover:bg-red-500/10 transition-all duration-300 relative group"
              >
                <span className="relative z-10">Logout</span>
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-red-500/20 to-transparent"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            ) : (
              <>
                <Link to="/signup">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-2.5 text-white border border-red-500/30 rounded-full hover:bg-red-500/10 transition-all duration-300 relative group"
                  >
                    <span className="relative z-10">Sign Up</span>
                    <motion.div
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-red-500/20 to-transparent"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.button>
                </Link>
                <Link to="/signin">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-2.5 bg-gradient-to-r from-red-700 to-red-500 text-white rounded-full relative overflow-hidden group"
                  >
                    <span className="relative z-10">Sign In</span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-700"
                      initial={{ x: "100%" }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="lg:hidden text-white p-2"
            onClick={() => setOpenNav(!openNav)}
          >
            <AnimatePresence mode="wait">
              {openNav ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {openNav && (
            <motion.div
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="lg:hidden bg-black/95 backdrop-blur-lg border-t border-red-500/10"
            >
              <div className="px-6 py-4 space-y-4">
                {/* Always show these links */}
                <motion.div variants={menuItemVariants}>
                  <Link
                    to="/"
                    className={`block py-2 text-lg transition-colors duration-300 ${
                      location.pathname === "/"
                        ? "text-red-500"
                        : "text-white hover:text-red-400"
                    }`}
                    onClick={() => setOpenNav(false)}
                  >
                    Home
                  </Link>
                </motion.div>
                <motion.div variants={menuItemVariants}>
                  <Link
                    to="/about"
                    className={`block py-2 text-lg transition-colors duration-300 ${
                      location.pathname === "/about"
                        ? "text-red-500"
                        : "text-white hover:text-red-400"
                    }`}
                    onClick={() => setOpenNav(false)}
                  >
                    About
                  </Link>
                </motion.div>
                <motion.div variants={menuItemVariants}>
                  <Link
                    to="/contact"
                    className={`block py-2 text-lg transition-colors duration-300 ${
                      location.pathname === "/contact"
                        ? "text-red-500"
                        : "text-white hover:text-red-400"
                    }`}
                    onClick={() => setOpenNav(false)}
                  >
                    Contact
                  </Link>
                </motion.div>
                <motion.div variants={menuItemVariants}>
                  <Link
                    to="/services"
                    className={`block py-2 text-lg transition-colors duration-300 ${
                      location.pathname === "/services"
                        ? "text-red-500"
                        : "text-white hover:text-red-400"
                    }`}
                    onClick={() => setOpenNav(false)}
                  >
                    Services
                  </Link>
                </motion.div>

                {/* Conditionally render Schedule and Community links for authenticated users */}
                {isAuthenticated && (
                  <>
                    <motion.div variants={menuItemVariants}>
                      <Link
                        to="/community"
                        className={`block py-2 text-lg transition-colors duration-300 ${
                          location.pathname === "/community"
                            ? "text-red-500"
                            : "text-white hover:text-red-400"
                        }`}
                        onClick={() => setOpenNav(false)}
                      >
                        Community
                      </Link>
                    </motion.div>
                    <motion.div variants={menuItemVariants}>
                      <Link
                        to="/schedule"
                        className={`block py-2 text-lg transition-colors duration-300 ${
                          location.pathname === "/schedule"
                            ? "text-red-500"
                            : "text-white hover:text-red-400"
                        }`}
                        onClick={() => setOpenNav(false)}
                      >
                        Schedule
                      </Link>
                    </motion.div>
                  </>
                )}

                <motion.div variants={menuItemVariants} className="pt-4 space-y-3">
                  {isAuthenticated ? (
                    <motion.button
                      onClick={() => {
                        onLogout();
                        setOpenNav(false);
                      }}
                      className="block w-full text-center px-6 py-2.5 text-white border border-red-500/30 rounded-full hover:bg-red-500/10 transition-all duration-300"
                    >
                      Logout
                    </motion.button>
                  ) : (
                    <>
                      <Link
                        to="/signup"
                        className="block w-full text-center px-6 py-2.5 text-white border border-red-500/30 rounded-full hover:bg-red-500/10 transition-all duration-300"
                        onClick={() => setOpenNav(false)}
                      >
                        Sign Up
                      </Link>
                      <Link
                        to="/signin"
                        className="block w-full text-center px-6 py-2.5 bg-gradient-to-r from-red-700 to-red-500 text-white rounded-full transition-all duration-300"
                        onClick={() => setOpenNav(false)}
                      >
                        Sign In
                      </Link>
                    </>
                  )}
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
NavbarComponent.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default NavbarComponent;
