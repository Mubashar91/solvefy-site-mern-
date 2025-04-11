import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchHeader,
  addHeaderItem,
  updateHeaderItem,
  deleteHeaderItem,
} from '../../store/actions/headerActions';

// Solvefy color palette
const colors = {
  primary: '#24275F',    // Dark blue
  secondary: '#4F46E5',  // Indigo
  accent: '#10B981',     // Emerald
  light: '#F9FAFB',      // Light gray
  dark: '#111827',       // Dark gray
  white: '#FFFFFF'
};

const HeaderManagement = () => {
  const dispatch = useDispatch();
  const { headerItems, loading, error } = useSelector(state => state.header);
  const [newItem, setNewItem] = useState({ text: '', link: '', order: 0 });
  const [editingItem, setEditingItem] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchHeader());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!newItem.text || !newItem.link) {
      alert("Text and link are required");
      return;
    }
  
    try {
      const link = editingItem
        ? `http://localhost:5000/api/header/${editingItem._id}`
        : "http://localhost:5000/api/header";
  
      const method = editingItem ? "PUT" : "POST";
  
      const response = await fetch(link, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP Error: ${response.status} - ${errorText}`);
      }
  
      setNewItem({ text: '', link: '', order: 0 });
      setEditingItem(null);
      setIsAdding(false);
      dispatch(fetchHeader()); // Refresh the list
  
    } catch (error) {
      console.error("Error submitting data:", error.message);
      alert(`An error occurred: ${error.message}`);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setNewItem({ ...item });
    setIsAdding(true);
    setIsMobileMenuOpen(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      await dispatch(deleteHeaderItem(id));
      dispatch(fetchHeader()); // Refresh the list
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div 
          className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4"
          style={{ borderColor: colors.primary }}
        ></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div 
        className="bg-white rounded-xl shadow-lg overflow-hidden"
        style={{ borderColor: colors.light, borderWidth: '1px' }}
      >
        <div className="p-6 sm:p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <h1 
                className="text-2xl font-bold"
                style={{ color: colors.primary }}
              >
                Header Management
              </h1>
              <span 
                className="hidden sm:inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
                style={{ backgroundColor: colors.light, color: colors.primary }}
              >
                {headerItems.length} {headerItems.length === 1 ? 'Item' : 'Items'}
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => {
                  setIsAdding(true);
                  setEditingItem(null);
                  setNewItem({ text: '', link: '', order: 0 });
                }}
                className="hidden sm:block px-4 py-2 font-semibold rounded-lg focus:outline-none transition duration-200 transform hover:scale-105"
                style={{ 
                  backgroundColor: colors.primary,
                  color: colors.white
                }}
              >
                Add New Item
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="sm:hidden p-2 rounded-lg focus:outline-none"
                style={{ color: colors.primary }}
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div className={`sm:hidden ${isMobileMenuOpen ? 'block' : 'hidden'} mb-6`}>
            <button
              onClick={() => {
                setIsAdding(true);
                setIsMobileMenuOpen(false);
                setEditingItem(null);
                setNewItem({ text: '', link: '', order: 0 });
              }}
              className="w-full px-4 py-2 font-semibold rounded-lg focus:outline-none transition duration-200"
              style={{ 
                backgroundColor: colors.primary,
                color: colors.white
              }}
            >
              Add New Item
            </button>
          </div>

          {/* Add/Edit Form */}
          {isAdding && (
            <div 
              className="mb-8 p-6 rounded-xl"
              style={{ backgroundColor: colors.light, borderColor: colors.primary, borderWidth: '1px' }}
            >
              <h2 
                className="text-lg font-semibold mb-4"
                style={{ color: colors.primary }}
              >
                {editingItem ? 'Edit Navigation Item' : 'Add New Navigation Item'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label 
                    className="block text-sm font-medium mb-2"
                    style={{ color: colors.primary }}
                  >
                    Text
                  </label>
                  <input
                    type="text"
                    value={newItem.text}
                    onChange={(e) => setNewItem({ ...newItem, text: e.target.value })}
                    placeholder="Enter text"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-transparent transition duration-200 placeholder-gray-500"
                    style={{ 
                      borderColor: colors.primary,
                      focusRingColor: colors.secondary
                    }}
                    required
                  />
                </div>
                <div>
                  <label 
                    className="block text-sm font-medium mb-2"
                    style={{ color: colors.primary }}
                  >
                    Link
                  </label>
                  <input
                    type="text"
                    value={newItem.link}
                    onChange={(e) => setNewItem({ ...newItem, link: e.target.value })}
                    placeholder="Enter link"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-transparent transition duration-200 placeholder-gray-500"
                    style={{ 
                      borderColor: colors.primary,
                      focusRingColor: colors.secondary
                    }}
                    required
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full px-4 py-2 font-semibold rounded-lg focus:outline-none transition duration-200 transform hover:scale-105"
                    style={{
                      backgroundColor: colors.secondary,
                      color: colors.white
                    }}
                  >
                    {editingItem ? 'Update Item' : 'Add Item'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Header Items List */}
          <div className="space-y-6">
            {headerItems.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between p-4 rounded-xl shadow-md hover:bg-gray-100 transition duration-200"
                style={{ borderColor: colors.primary, backgroundColor: colors.white }}
              >
                <div>
                  <h3 
                    className="text-lg font-medium"
                    style={{ color: colors.primary }}
                  >
                    {item.text}
                  </h3>
                  <p 
                    className="text-sm text-gray-500"
                    style={{ color: colors.dark }}
                  >
                    {item.link}
                  </p>
                </div>
                <div className="space-x-4">
                  <button
                    onClick={() => handleEdit(item)}
                    className="text-indigo-500 hover:text-indigo-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderManagement;
