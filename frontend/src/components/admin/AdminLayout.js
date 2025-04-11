import React from 'react';
import { motion } from 'framer-motion';
import { ToastContainer } from 'react-toastify';
import { Outlet } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from './Sidebar';

const AdminLayout = () => {
    return (
        <div className="flex h-screen bg-[#F9FAFB] overflow-hidden">
            <Sidebar />
            <motion.main
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="flex-1 overflow-y-auto ml-64"
            >
                <div className="p-8">
                    <div className="max-w-7xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white rounded-lg shadow-sm p-6"
                        >
                            <Outlet />
                        </motion.div>
                    </div>
                </div>
            </motion.main>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    );
};

export default AdminLayout;