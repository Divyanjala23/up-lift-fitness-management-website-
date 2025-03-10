import { useState, useEffect } from "react"; // Only import hooks
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import { navbarContent } from '../const';

const NavbarComponent = ({ isAuthenticated }) => {
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

  // Filter nav links based on authentication
  const filteredNavLinks = isAuthenticated
    ? navbarContent.navLinks
    : navbarContent.navLinks.filter((item) =>
        ["Home", "About", "Contact", "Services"].includes(item.text)
      );

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
            {filteredNavLinks.map((item, index) => (
              <motion.div
                key={index}
                custom={index}
                variants={linkVariants}
                initial="hidden"
                animate="visible"
              >
                <Link
                  to={item.linkTo}
                  className={`relative group py-2 text-lg font-medium transition-colors duration-300 ${
                    location.pathname === item.linkTo
                      ? "text-red-500"
                      : "text-white hover:text-red-400"
                  }`}
                >
                  <span className="relative z-10">{item.text}</span>
                  <motion.span
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-red-500 rounded-full"
                    initial={{ scaleX: 0 }}
                    animate={{
                      scaleX: location.pathname === item.linkTo ? 1 : 0,
                    }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <Link to={navbarContent.button_1.linkTo}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-2.5 text-white border border-red-500/30 rounded-full hover:bg-red-500/10 transition-all duration-300 relative group"
                  >
                    <span className="relative z-10">
                      {navbarContent.button_1.text}
                    </span>
                    <motion.div
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-red-500/20 to-transparent"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.button>
                </Link>
                <Link to={navbarContent.button_2.linkTo}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-2.5 bg-gradient-to-r from-red-700 to-red-500 text-white rounded-full relative overflow-hidden group"
                  >
                    <span className="relative z-10">
                      {navbarContent.button_2.text}
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-700"
                      initial={{ x: "100%" }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/signin">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-2.5 text-white border border-red-500/30 rounded-full hover:bg-red-500/10 transition-all duration-300 relative group"
                  >
                    <span className="relative z-10">Sign In</span>
                  </motion.button>
                </Link>
                <Link to="/signup">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-2.5 bg-gradient-to-r from-red-700 to-red-500 text-white rounded-full relative overflow-hidden group"
                  >
                    <span className="relative z-10">Sign Up</span>
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
                {filteredNavLinks.map((item, index) => (
                  <motion.div
                    key={index}
                    variants={menuItemVariants}
                    className="transform-gpu"
                  >
                    <Link
                      to={item.linkTo}
                      className={`block py-2 text-lg transition-colors duration-300 ${
                        location.pathname === item.linkTo
                          ? "text-red-500"
                          : "text-white hover:text-red-400"
                      }`}
                      onClick={() => setOpenNav(false)}
                    >
                      {item.text}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  variants={menuItemVariants}
                  className="pt-4 space-y-3"
                >
                  {isAuthenticated ? (
                    <>
                      <Link
                        to={navbarContent.button_1.linkTo}
                        className="block w-full text-center px-6 py-2.5 text-white border border-red-500/30 rounded-full hover:bg-red-500/10 transition-all duration-300"
                        onClick={() => setOpenNav(false)}
                      >
                        {navbarContent.button_1.text}
                      </Link>
                      <Link
                        to={navbarContent.button_2.linkTo}
                        className="block w-full text-center px-6 py-2.5 bg-gradient-to-r from-red-700 to-red-500 text-white rounded-full transition-all duration-300"
                        onClick={() => setOpenNav(false)}
                      >
                        {navbarContent.button_2.text}
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/signin"
                        className="block w-full text-center px-6 py-2.5 text-white border border-red-500/30 rounded-full hover:bg-red-500/10 transition-all duration-300"
                        onClick={() => setOpenNav(false)}
                      >
                        Sign In
                      </Link>
                      <Link
                        to="/signup"
                        className="block w-full text-center px-6 py-2.5 bg-gradient-to-r from-red-700 to-red-500 text-white rounded-full transition-all duration-300"
                        onClick={() => setOpenNav(false)}
                      >
                        Sign Up
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

export default NavbarComponent;
