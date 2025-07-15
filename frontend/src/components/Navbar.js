import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSun } from 'react-icons/fa'; // Icon for the button
import { toast } from 'react-toastify';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [headerItems, setHeaderItems] = useState([]);
  const [logo, setLogo] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isDarkMode, toggleTheme } = useTheme();

  // Get the current route using useLocation
  const location = useLocation();

  // Check if the route is for the admin panel
  const isAdminRoute = location.pathname.includes('/admin');

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch header data and logo
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch header items
        const headerResponse = await fetch('http://localhost:5000/api/header');
        if (!headerResponse.ok) throw new Error('Failed to fetch header items');
        const headerData = await headerResponse.json();
        const activeItems = headerData.filter(item => item.isActive);
        setHeaderItems(activeItems);

        // Fetch logo
        const logoResponse = await fetch('http://localhost:5000/api/header-settings');
        if (!logoResponse.ok) throw new Error('Failed to fetch logo');
        const logoData = await logoResponse.json();
        
        if (logoData && logoData.length > 0) {
          const latestLogo = logoData[logoData.length - 1];
          if (latestLogo.logo) {
            setLogo(`http://localhost:5000${latestLogo.logo}`);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to load header data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Solvefy.io color scheme
  const colors = {
    primary: '#252860',   // Dark blue
    secondary: '#3469B2', // Light blue
    accent: '#10B981',    // Emerald
    light: '#F9FAFB',     // Light gray
    dark: '#111827'       // Dark gray
  };

  // Animation variants
  const navVariants = {
    scrolled: {
      backgroundColor: !isDarkMode ? colors.light : colors.primary,
      boxShadow: `0 4px 20px rgba(0,0,0,0.08)`,
      paddingTop: '1rem',
      paddingBottom: '1rem',
      transition: { duration: 0.3 }
    },
    normal: {
      backgroundColor: !isDarkMode ? colors.light : colors.primary,
      boxShadow: `0 4px 20px rgba(0, 0, 0, 0.1)`,
      paddingTop: '1.5rem',
      paddingBottom: '1.5rem',
      transition: { duration: 0.3 }
    }
  };

  const menuItemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
        type: 'spring',
        stiffness: 100
      }
    })
  };

  const mobileMenuVariants = {
    open: {
      opacity: 1,
      height: 'auto',
      transition: {
        duration: 0.4,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    },
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  };

  // Do not render Navbar on admin routes
  if (isAdminRoute) return null;

  return (
    <motion.nav
      initial="normal"
      animate={isScrolled ? 'scrolled' : 'normal'}
      variants={navVariants}
      className="fixed w-full top-0 left-0 z-50"
    >
      <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="flex justify-between items-center">
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-4">
            {loading ? (
              <div className="h-14 w-14 bg-gray-200 rounded-lg animate-pulse" />
            ) : logo ? (
              <motion.img
                src={logo}
                alt="Solvefy Logo"
                className="h-14 w-auto object-contain"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                whileHover={{ scale: 1.05 }}
                onError={(e) => {
                  console.error('Error loading logo:', e);
                  toast.error('Failed to load logo');
                }}
              />
            ) : (
              <div className="h-14 w-14 bg-gray-200 rounded-lg" />
            )}
            <motion.span
              className="text-3xl font-bold text-white tracking-tight"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              style={{ color: isScrolled ? colors.primary : colors.light }}
            >
              Solvefy
            </motion.span>
          </Link>

          {/* Desktop Nav - Increased spacing and item size */}
          <motion.div className="hidden md:flex items-center space-x-12 text-2xl"> {/* Increased item size */}
            {headerItems.map((item, i) => (
              <motion.div
                key={item._id}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={menuItemVariants}
                whileHover={{ scale: 1.05, color: colors.accent }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  to={item.link}
                  className={`font-semibold transition-colors ${
                    !isDarkMode ? 'text-gray-800' : 'text-white'
                  } hover:${!isDarkMode ? 'text-indigo-600' : 'text-emerald-300'}`}
                >
                  {item.text}
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Button with Icon on Right */}
          <motion.button
            onClick={toggleTheme}
            className="flex items-center justify-center p-3 rounded-lg ml-6 bg-gradient-to-r from-indigo-600 to-emerald-500 hover:from-indigo-700 hover:to-emerald-600 transition-all shadow-md"
            whileTap={{ scale: 0.95 }}
          >
            <FaSun className="text-white text-xl" />
          </motion.button>
        </div>

        {/* Mobile Menu - More professional styling */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="md:hidden mt-4 rounded-xl shadow-xl overflow-hidden"
              style={{ backgroundColor: colors.light }}
            >
              <div className="py-4 space-y-3 px-4">
                {headerItems.map((item, i) => (
                  <motion.div
                    key={item._id}
                    variants={{
                      open: { opacity: 1, y: 0 },
                      closed: { opacity: 0, y: -10 }
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <Link
                      to={item.link}
                      onClick={() => setIsOpen(false)}
                      className="block px-6 py-4 text-lg font-medium text-gray-800 hover:text-indigo-600 hover:bg-indigo-50 transition-all rounded-lg"
                    >
                      {item.text}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  variants={{
                    open: { opacity: 1, y: 0 },
                    closed: { opacity: 0, y: -10 }
                  }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                  className="pt-2"
                >
                  <Link
                    to="/contact"
                    onClick={() => setIsOpen(false)}
                    className="block w-full px-6 py-4 text-lg font-bold text-center text-white bg-gradient-to-r from-indigo-600 to-emerald-500 hover:from-indigo-700 hover:to-emerald-600 transition-all rounded-lg shadow-md"
                  >
                    Contact Us
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
