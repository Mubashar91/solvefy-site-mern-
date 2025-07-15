import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FiUpload, FiImage, FiCheck, FiX } from 'react-icons/fi';

const LogoManagement = () => {
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [logoWidth, setLogoWidth] = useState(100);
  const [logoHeight, setLogoHeight] = useState(50);
  const [currentLogo, setCurrentLogo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    fetchCurrentLogo();
  }, []);

  const fetchCurrentLogo = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/header-settings');
      if (response.data && response.data.length > 0) {
        const latestLogo = response.data[response.data.length - 1];
        setCurrentLogo(latestLogo);
        setText(latestLogo.text || '');
        setLogoWidth(latestLogo.logoWidth || 100);
        setLogoHeight(latestLogo.logoHeight || 50);
      }
    } catch (error) {
      console.error('Error fetching logo:', error);
      toast.error('Failed to fetch current logo');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0];
    handleFile(selected);
  };

  const handleFile = (selected) => {
    if (!selected) return;

    // Validate file type
    if (!selected.type.match(/image\/(jpeg|png|gif|svg\+xml)/)) {
      toast.error('Please select a valid image file (JPEG, PNG, GIF, or SVG)');
      return;
    }

    // Validate file size (max 5MB)
    if (selected.size > 5 * 1024 * 1024) {
      toast.error('File size should be less than 5MB');
      return;
    }

    setFile(selected);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(selected);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    handleFile(droppedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!text || !file) {
      toast.error('Please provide both logo text and a file');
      return;
    }

    const formData = new FormData();
    formData.append('text', text);
    formData.append('logoWidth', logoWidth);
    formData.append('logoHeight', logoHeight);
    formData.append('logo', file);

    try {
      setLoading(true);
      await axios.post('http://localhost:5000/api/header-settings', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Logo uploaded successfully!');
      await fetchCurrentLogo();

      // Clear form
      setFile(null);
      setPreviewUrl('');
    } catch (error) {
      console.error('Upload failed:', error);
      toast.error('Error uploading logo. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-lg p-8"
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Logo Management</h2>
        
        {/* Current Logo Display */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center py-8"
            >
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </motion.div>
          ) : currentLogo?.logo ? (
            <motion.div
              key="logo"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mb-8 p-6 bg-gray-50 rounded-xl"
            >
              <h3 className="text-xl font-semibold text-gray-700 mb-4">Current Logo</h3>
              <div className="flex flex-col items-center space-y-4">
                <div className="relative group">
                  <img
                    src={`http://localhost:5000${currentLogo.logo}`}
                    alt="Current Logo"
                    style={{ width: `${currentLogo.logoWidth || 100}px`, height: `${currentLogo.logoHeight || 50}px` }}
                    className="object-contain rounded-lg shadow-sm transition-transform group-hover:scale-105"
                    onError={(e) => {
                      console.error('Error loading image:', e);
                      toast.error('Failed to load logo image');
                    }}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 rounded-lg"></div>
                </div>
                <p className="text-gray-600 font-medium">{currentLogo.text}</p>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        {/* Upload Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Logo Text Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Logo Text</label>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter logo text"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>

          {/* File Drop Zone */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              required
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="space-y-4">
              <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="text-gray-600">
                <span className="font-medium">Click to upload</span> or drag and drop
                <br />
                SVG, PNG, JPG or GIF (max. 5MB)
              </div>
            </div>
          </div>

          {/* Preview */}
          <AnimatePresence>
            {previewUrl && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-gray-50 rounded-lg p-6"
              >
                <h3 className="text-lg font-medium text-gray-700 mb-4">Preview</h3>
                <div className="flex flex-col items-center space-y-4">
                  <img
                    src={previewUrl}
                    alt="Logo Preview"
                    style={{ width: `${logoWidth}px`, height: `${logoHeight}px` }}
                    className="object-contain rounded-lg shadow-sm"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Dimensions Controls */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Width (px)</label>
              <input
                type="number"
                value={logoWidth}
                onChange={(e) => setLogoWidth(Number(e.target.value))}
                min="1"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Height (px)</label>
              <input
                type="number"
                value={logoHeight}
                onChange={(e) => setLogoHeight(Number(e.target.value))}
                min="1"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-6 rounded-lg text-white font-medium transition-all ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800'
            }`}
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Uploading...
              </span>
            ) : (
              'Upload Logo'
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default LogoManagement;
