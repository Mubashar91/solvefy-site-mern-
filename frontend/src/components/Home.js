import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiCode, FiLayers, FiGlobe, FiShield, FiTrendingUp, FiUsers } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

const Home = () => {
  const { isDarkMode } = useTheme();
  const [text, setText] = useState('The Partner You Need!');
  const [showSecondText, setShowSecondText] = useState(false);

  // Animation to switch text after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSecondText(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Solvefy color scheme
  const colors = {
    primary: '#252860',   // Dark blue
    secondary: '#3469B2', // Light blue
    accent: '#10B981',    // Emerald
    light: '#F9FAFB',     // Light gray
    dark: '#111827'       // Dark gray
  };

  const features = [
    {
      icon: FiCode,
      title: 'Custom Development',
      description: 'Tailored solutions for your unique business needs',
      color: colors.primary
    },
    {
      icon: FiLayers,
      title: 'Full Stack Solutions',
      description: 'End-to-end development from frontend to backend',
      color: colors.secondary
    },
    {
      icon: FiGlobe,
      title: 'Web Applications',
      description: 'Modern, responsive, and scalable web applications',
      color: colors.accent
    },
    {
      icon: FiShield,
      title: 'Secure Solutions',
      description: 'Enterprise-grade security for your applications',
      color: colors.dark
    }
  ];

  const services = [
    {
      title: 'Web Development',
      description: 'Custom web applications built with modern technologies',
      icon: FiCode
    },
    {
      title: 'Mobile Apps',
      description: 'Cross-platform mobile applications for iOS and Android',
      icon: FiLayers
    },
    {
      title: 'Cloud Solutions',
      description: 'Scalable cloud infrastructure and deployment',
      icon: FiGlobe
    },
    {
      title: 'Digital Marketing',
      description: 'Strategic digital marketing solutions',
      icon: FiTrendingUp
    },
    {
      title: 'UI/UX Design',
      description: 'Beautiful and intuitive user interfaces',
      icon: FiUsers
    }
  ];

  return (
    <div className={`min-h-screen transition-all duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
      {/* Hero Section */}
      <section className="relative flex flex-col lg:flex-row items-center justify-between pt-32 px-4 sm:px-6 lg:px-8">
        {/* Left Side: Text and Button */}
        <div className="lg:w-1/2 z-10">
          <AnimatePresence mode="wait">
            {!showSecondText ? (
              <motion.h1
                key="text1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className={`text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight mb-4 transition-colors duration-300 ${
                  isDarkMode ? 'text-white' : 'text-[#252860]'
                }`}
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {text}
              </motion.h1>
            ) : (
              <motion.h1
                key="text2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className={`text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight mb-4 transition-colors duration-300 ${
                  isDarkMode ? 'text-white' : 'text-[#252860]'
                }`}
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                The Partner You Need!
              </motion.h1>
            )}
          </AnimatePresence>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`text-lg sm:text-xl lg:text-2xl mb-8 transition-colors duration-300 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            Your Vision, Our Experience, The Perfect Combination
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link
              to="/quote"
              className={`inline-flex items-center px-8 py-4 font-semibold rounded-lg shadow-md transition-all duration-300 text-lg uppercase tracking-wider ${
                isDarkMode 
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-[#252860] text-white hover:bg-opacity-90'
              }`}
            >
              get a quote
              <svg
                className="ml-2 h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </motion.div>
        </div>

        {/* Right Side: Diagonal Split with Image */}
        <div className="lg:w-1/2 relative mt-10 lg:mt-0 h-[600px]">
          {/* Diagonal Background */}
          <div className="absolute inset-0 overflow-hidden">
            <div className={`absolute top-0 right-0 w-full h-full transform origin-top-left -skew-x-12 translate-x-1/3 transition-colors duration-300 ${
              isDarkMode ? 'bg-blue-900' : 'bg-[#252860]'
            }`}></div>
          </div>

          {/* Content Container */}
          <div className="relative h-full flex items-center justify-center px-8">
            <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
              className="w-full max-w-2xl"
            >
              {/* Office Interior Image */}
              <div className="relative aspect-[16/9] rounded-lg overflow-hidden shadow-2xl">
                <img
                  src="https://www.solvefy.io/images/slider/slider-1.jpg"
                  alt="Solvefy Office"
                  className="w-full h-full object-cover"
                />
                {/* Logo Overlay */}
                <div className={`absolute inset-0 flex items-center justify-center transition-colors duration-300 ${
                  isDarkMode ? 'bg-black bg-opacity-50' : 'bg-black bg-opacity-30'
                }`}>
                  <img
                    src="https://www.solvefy.io/images/logo.png"
                    alt="Solvefy Logo"
                    className="w-64"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Background Pattern */}
        <div className="absolute inset-0 z-0">
          <div 
            className={`absolute inset-0 transition-opacity duration-300 ${
              isDarkMode ? 'opacity-10' : 'opacity-5'
            }`}
            style={{
              backgroundImage: 'url("https://www.solvefy.io/images/pattern-bg.png")',
              backgroundRepeat: 'repeat',
              backgroundSize: '20px'
            }}
          ></div>
        </div>
      </section>

      {/* Features Section */}
      <section className={`py-20 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Why Choose Solvefy?</h2>
            <p className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>We deliver excellence in every project</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`p-6 rounded-xl shadow-lg hover:shadow-xl transition-all ${
                  isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white'
                }`}
              >
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: `${feature.color}20` }}>
                  <feature.icon className="w-6 h-6" style={{ color: feature.color }} />
                </div>
                <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{feature.title}</h3>
                <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className={`py-20 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-3xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Our Services</h2>
            <p className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Comprehensive solutions for your business needs</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`p-6 rounded-xl shadow-lg hover:shadow-xl transition-all group ${
                  isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white'
                }`}
              >
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                  isDarkMode ? 'bg-blue-900/50 group-hover:bg-blue-900/70' : 'bg-blue-50 group-hover:bg-blue-100'
                } transition-colors`}>
                  <service.icon className={`w-6 h-6 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                </div>
                <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{service.title}</h3>
                <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{service.description}</p>
                <a href="#" className={`font-medium transition-colors ${
                  isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'
                }`}>
                  Learn more →
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`py-20 ${isDarkMode ? 'bg-gradient-to-r from-blue-900 to-blue-800' : 'bg-gradient-to-r from-blue-600 to-blue-800'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-white mb-4"
          >
            Ready to Transform Your Business?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto"
          >
            Let's discuss how we can help you achieve your digital goals.
          </motion.p>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className={`px-8 py-3 rounded-lg font-medium transition-colors ${
              isDarkMode 
                ? 'bg-gray-800 text-white hover:bg-gray-700' 
                : 'bg-white text-blue-600 hover:bg-blue-50'
            }`}
          >
            Contact Us
          </motion.button>
        </div>
      </section>
    </div>
  );
};

export default Home;