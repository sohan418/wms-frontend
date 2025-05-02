import React from 'react';
import { BrowserRouter as Router, Routes, Route,Navigate } from 'react-router-dom';
import './App.css';

// Import plain CSS components
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard/Dashboard';
import Inventory from './pages/Inventory/Inventory';
import Gatepass from './pages/Gatepass/Gatepass';
import Profile from './pages/Profile/Profile';
import GRN from './pages/GRN/GRN';
import Settings from './pages/Settings/Settings';
import Login from './pages/Login/Login';
import SKUPage from './pages/SKUPage/SKUPage'; // Add this import

// Add with other imports
import Notifications from './pages/Notifications/Notifications';

import OrdersPage from './pages/Orders/Orders';

// Remove ThemeProvider from Layout component and add here
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          {/* Public route */}
          <Route path="/login" element={<Login />} />
          
          {/* Authenticated routes */}
          <Route element={<Layout />}>
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/gatepass" element={<Gatepass />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/skus" element={<SKUPage />} /> {/* Add this route */}
            <Route path="/grn" element={<GRN />} />
            <Route path="/settings" element={<Settings />} />
            <Route path='/orders' element={<OrdersPage/>}/>
          </Route>
          </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
