import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiBriefcase, FiFolder, FiBook, FiUsers } from 'react-icons/fi';
import axios from 'axios';

const Dashboard = () => {
  const [stats, setStats] = useState({
    activeJobs: 0,
    totalProjects: 0,
    totalBlogs: 0,
    totalClients: 0
  });

  const [loading, setLoading] = useState(true);

  // Solvefy color scheme
  const colors = {
    primary: '#252860',   // Dark blue
    secondary: '#3469B2', // Light blue
    accent: '#10B981',    // Emerald
    light: '#F9FAFB',     // Light gray
    dark: '#111827'       // Dark gray
  };

  useEffect(() => {
    // Simulated API call - replace with actual API endpoints
    const fetchStats = async () => {
      try {
        setLoading(true);
        // Replace these with actual API calls
        const response = await axios.get('http://localhost:5000/api/stats');
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching stats:', error);
        // Use dummy data for now
        setStats({
          activeJobs: 12,
          totalProjects: 45,
          totalBlogs: 28,
          totalClients: 150
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const cards = [
    {
      title: 'Active Jobs',
      value: stats.activeJobs,
      icon: FiBriefcase,
      color: colors.primary,
      gradient: 'from-blue-600 to-blue-800'
    },
    {
      title: 'Our Projects',
      value: stats.totalProjects,
      icon: FiFolder,
      color: colors.secondary,
      gradient: 'from-blue-500 to-blue-700'
    },
    {
      title: 'Blog Posts',
      value: stats.totalBlogs,
      icon: FiBook,
      color: colors.accent,
      gradient: 'from-emerald-500 to-emerald-700'
    },
    {
      title: 'Total Clients',
      value: stats.totalClients,
      icon: FiUsers,
      color: colors.dark,
      gradient: 'from-gray-700 to-gray-900'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome to your Solvefy dashboard</p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {cards.map((card, index) => (
          <motion.div
            key={card.title}
            variants={cardVariants}
            className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${card.gradient} shadow-lg`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 transform -rotate-45 scale-150">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute h-48 w-full"
                    style={{
                      top: `${i * 20}%`,
                      backgroundColor: 'currentColor',
                      opacity: 0.1 * (i + 1)
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="relative p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-white text-lg font-semibold">{card.title}</span>
                <card.icon className="w-6 h-6 text-white opacity-80" />
              </div>
              
              <div className="flex items-baseline">
                {loading ? (
                  <div className="h-8 w-16 bg-white/20 rounded animate-pulse" />
                ) : (
                  <span className="text-3xl font-bold text-white">
                    {card.value.toLocaleString()}
                  </span>
                )}
              </div>

              <div className="mt-4 flex items-center">
                <div className="flex items-center text-white/80 text-sm">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: 'auto' }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="overflow-hidden whitespace-nowrap"
                  >
                    View Details
                  </motion.div>
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Additional Dashboard Content */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-lg p-6"
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {loading ? (
              [...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <div className="h-10 w-10 rounded-full bg-gray-200 animate-pulse" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded animate-pulse" />
                    <div className="h-3 w-1/2 bg-gray-200 rounded animate-pulse" />
                  </div>
                </div>
              ))
            ) : (
              <div className="text-gray-600">No recent activity</div>
            )}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-lg p-6"
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            {['Add New Project', 'Create Blog Post', 'Manage Jobs', 'View Reports'].map((action, index) => (
              <motion.button
                key={action}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`p-4 rounded-xl text-white font-medium text-sm text-center transition-colors ${
                  index === 0
                    ? 'bg-gradient-to-r from-blue-600 to-blue-800'
                    : index === 1
                    ? 'bg-gradient-to-r from-emerald-500 to-emerald-700'
                    : index === 2
                    ? 'bg-gradient-to-r from-blue-500 to-blue-700'
                    : 'bg-gradient-to-r from-gray-700 to-gray-900'
                }`}
              >
                {action}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard; 