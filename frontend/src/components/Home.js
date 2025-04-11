import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

// Color palette
const colors = {
  primary: '#1E3A8A',
  secondary: '#4F46E5',
  accent: '#10B981',
  light: '#F9FAFB',
  dark: '#111827',
  white: '#FFFFFF',
};

const Home = () => {
  const [text, setText] = useState('The Partner You Need!');
  const [showSecondText, setShowSecondText] = useState(false);

  // Animation to switch text after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSecondText(true);
    }, 2000); // Show first text for 2 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Hero Section */}
      <section className="relative flex flex-col lg:flex-row items-center justify-between py-16 px-4 sm:px-6 lg:px-8">
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
                className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4 text-gray-900"
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
                className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4 text-gray-900"
              >
                The Partner You Need!
              </motion.h1>
            )}
          </AnimatePresence>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg sm:text-xl lg:text-2xl text-gray-600 mb-8"
          >
            Your Vision, Our Experience, The Perfect Combination.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link
              to="/quote"
              className="inline-flex items-center px-6 py-3 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-opacity-90 transition duration-300"
              style={{ backgroundColor: colors.primary }}
            >
              Get a Quote
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

        {/* Right Side: Image with Geometric Shapes */}
        <div className="lg:w-1/2 relative mt-10 lg:mt-0">
          {/* Background Geometric Shapes */}
          <div className="absolute inset-0">
            <div
              className="absolute top-0 left-0 w-3/4 h-3/4 bg-blue-900 transform -translate-x-1/4 -translate-y-1/4"
              style={{ backgroundColor: colors.primary }}
            />
            <div className="absolute bottom-0 right-0 w-3/4 h-3/4 bg-white transform translate-x-1/4 translate-y-1/4" />
          </div>

          {/* Image */}
          <motion.img
            src="https://via.placeholder.com/600x400?text=Solvefy+Office"
            alt="Solvefy Office"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 w-full h-auto rounded-lg shadow-lg"
          />
        </div>
      </section>
    </div>
  );
};

export default Home;