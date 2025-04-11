// src/App.js
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import ErrorBoundary from './components/ErrorBoundary';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppRoutes from './components/AppRoutes'; // ✅ make sure this line is correct

function App() {
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <Router>
          <AppRoutes />
          <ToastContainer />
        </Router>
      </ErrorBoundary>
    </Provider>
  );
}

export default App;
