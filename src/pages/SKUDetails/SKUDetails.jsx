import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './SKUDetails.css';

const SKUDetails = () => {
  const { skuId } = useParams();
  
  // Sample data (replace with API call)
  const skuData = {
    sku: 'SKU-001',
    name: 'Premium Widget',
    description: 'High-performance industrial widget with safety features',
    quantity: 150,
    category: 'Electronics',
    location: 'A1-12',
    supplier: 'Widgets Inc.',
    lastUpdated: '2024-02-15',
    status: 'In Stock'
  };

  return (
    <div className="sku-details-container">
      <div className="header-section">
        <div className="header-controls">
          <Link to="/inventory" className="back-button">
            &larr; Back to Inventory
          </Link>
          <Link to="/add-sku" className="new-sku-button">
            + New SKU
          </Link>
        </div>
        <h1>{skuData.name} ({skuData.sku})</h1>
      </div>

      <div className="details-grid">
        <div className="detail-card">
          <h2>Basic Information</h2>
          <div className="detail-item">
            <span>SKU Number</span>
            <span>{skuData.sku}</span>
          </div>
          <div className="detail-item">
            <span>Category</span>
            <span>{skuData.category}</span>
          </div>
          <div className="detail-item">
            <span>Description</span>
            <p>{skuData.description}</p>
          </div>
        </div>

        <div className="detail-card">
          <h2>Stock Details</h2>
          <div className="detail-item">
            <span>Current Quantity</span>
            <span className="quantity">{skuData.quantity}</span>
          </div>
          <div className="detail-item">
            <span>Stock Status</span>
            <span className={`status ${skuData.status.toLowerCase().replace(' ', '-')}`}>
              {skuData.status}
            </span>
          </div>
          <div className="detail-item">
            <span>Last Updated</span>
            <span>{skuData.lastUpdated}</span>
          </div>
        </div>

        <div className="detail-card">
          <h2>Location & Supplier</h2>
          <div className="detail-item">
            <span>Storage Location</span>
            <span>{skuData.location}</span>
          </div>
          <div className="detail-item">
            <span>Supplier</span>
            <span>{skuData.supplier}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SKUDetails;