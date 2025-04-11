import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const LogoManagement = () => {
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [logoWidth, setLogoWidth] = useState(100);
  const [logoHeight, setLogoHeight] = useState(50);
  const [currentLogo, setCurrentLogo] = useState(null);
  const [loading, setLoading] = useState(false);

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
    const selected = e.target.files[0];
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
      const response = await axios.post('http://localhost:5000/api/header-settings', formData, {
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

  const getLogoUrl = (logoPath) => {
    if (!logoPath) return '';
    // Check if the path is already a full URL
    if (logoPath.startsWith('http')) return logoPath;
    // Otherwise, construct the full URL
    return `http://localhost:5000${logoPath}`;
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Logo Management</h2>
      
      {/* Current Logo Display */}
      {loading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      ) : currentLogo && currentLogo.logo ? (
        <div className="mb-8 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Current Logo</h3>
          <div className="flex items-center justify-center">
            <img
              src={getLogoUrl(currentLogo.logo)}
              alt="Current Logo"
              style={{ width: `${currentLogo.logoWidth || 100}px`, height: `${currentLogo.logoHeight || 50}px` }}
              className="object-contain"
              onError={(e) => {
                console.error('Error loading image:', e);
                toast.error('Failed to load logo image');
              }}
            />
          </div>
          <p className="text-center mt-2 text-gray-600">{currentLogo.text}</p>
        </div>
      ) : (
        <div className="mb-8 p-4 bg-gray-50 rounded-lg text-center">
          <p className="text-gray-600">No logo uploaded yet</p>
        </div>
      )}

      {/* Upload Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Logo Text</label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter logo text"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Upload New Logo</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            required
            className="mt-1 block w-full"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Logo Width (px)</label>
            <input
              type="number"
              value={logoWidth}
              onChange={(e) => setLogoWidth(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Logo Height (px)</label>
            <input
              type="number"
              value={logoHeight}
              onChange={(e) => setLogoHeight(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        {previewUrl && (
          <div className="text-center">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Preview</h3>
            <img
              src={previewUrl}
              alt="Logo Preview"
              style={{ width: `${logoWidth}px`, height: `${logoHeight}px` }}
              className="mx-auto object-contain"
            />
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {loading ? 'Uploading...' : 'Upload Logo'}
        </button>
      </form>
    </div>
  );
};

export default LogoManagement;
