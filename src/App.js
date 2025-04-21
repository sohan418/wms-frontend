import React from 'react';
import { BrowserRouter as Router, Routes, Route,Navigate } from 'react-router-dom';
import './App.css';

// Import plain CSS components
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard/Dashboard';
import Inventory from './pages/Inventory/Inventory';
import SKUDetails from './pages/SKUDetails/SKUDetails';
import AddSKU from './pages/AddSKU/AddSKU';
import Gatepass from './pages/Gatepass/Gatepass';
import Profile from './pages/Profile/Profile';
import SKUPage from './pages/SKUPage/SKUPage';
import GRN from './pages/GRN/GRN';
import Settings from './pages/Settings/Settings';
import Login from './pages/Login/Login';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public route */}
        <Route path="/login" element={<Login />} />
        
        {/* Authenticated routes */}
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/sku/:skuId" element={<SKUDetails />} />
          <Route path="/add-sku" element={<AddSKU />} />
          <Route path="/gatepass" element={<Gatepass />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/skus" element={<SKUPage />} />
          <Route path="/grn" element={<GRN />} />
          <Route path="/settings" element={<Settings />} />
        </Route>

        {/* Redirect base path to login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
