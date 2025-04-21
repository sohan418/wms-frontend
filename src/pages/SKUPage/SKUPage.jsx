import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SKUTable from '../../components/SKUTable/SKUTable';
import './SKUPage.css';

const SKUPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  
  // Sample data - add archived items
  const skuData = [
    { sku: 'SKU-001', name: 'Widget A', quantity: 150, location: 'A1-12', status: 'In Stock' },
    { sku: 'SKU-002', name: 'Gadget B', quantity: 23, location: 'B3-05', status: 'Low Stock' },
    { sku: 'SKU-003', name: 'Industrial Bearing', quantity: 45, location: 'C2-08', status: 'In Stock' },
    { sku: 'SKU-004', name: 'Hydraulic Hose', quantity: 12, location: 'D4-15', status: 'Low Stock' },
    { sku: 'SKU-005', name: 'Safety Gloves', quantity: 200, location: 'E1-03', status: 'In Stock' },
    { sku: 'SKU-006', name: 'Steel Cable', quantity: 8, location: 'F3-22', status: 'Low Stock' },
    { sku: 'SKU-007', name: 'LED Worklight', quantity: 35, location: 'G2-11', status: 'In Stock' },
    { sku: 'SKU-008', name: 'Toolbox Set', quantity: 5, location: 'H4-09', status: 'Low Stock' },
    { sku: 'SKU-009', name: 'Retired Item', quantity: 0, location: 'Z1-00', status: 'Archived' },
  ];

  // Integrated filtering
  const filteredSKUs = skuData.filter(item => {
    const searchMatch = item.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      item.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    if(activeTab === 'low-stock') return searchMatch && item.status === 'Low Stock';
    if(activeTab === 'archived') return searchMatch && item.status === 'Archived';
    return searchMatch;
  });

  return (
    <div className="sku-page-container">
      <div className="page-header">
        <h1>SKU Management</h1>
        <div className="header-controls">
          <input
            type="text"
            placeholder="Search SKUs..."
            className="search-box"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Link to="/add-sku" className="add-sku-button">
            + New SKU
          </Link>
        </div>
      </div>
      
      {/* Add tab navigation */}
      <div className="tabs-container">
        <div className="tabs">
          <button 
            className={`tab ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            All SKUs
          </button>
          <button
            className={`tab ${activeTab === 'low-stock' ? 'active' : ''}`}
            onClick={() => setActiveTab('low-stock')}
          >
            Low Stock ({skuData.filter(item => item.status === 'Low Stock').length})
          </button>
          <button
            className={`tab ${activeTab === 'archived' ? 'active' : ''}`}
            onClick={() => setActiveTab('archived')}
          >
            Archived
          </button>
        </div>
      </div>

      <SKUTable data={filteredSKUs} />
    </div>
  );
};

export default SKUPage;