import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Warehouse Overview</h1>
      
      <div className="metrics-grid">
        <div className="metric-card">
          <h3>Total Inventory</h3>
          <p>1,234 SKUs</p>
        </div>
        <div className="metric-card">
          <h3>Pending Orders</h3>
          <p>56 Orders</p>
        </div>
        <div className="metric-card">
          <h3>Low Stock</h3>
          <p>24 Items</p>
        </div>
        <div className="metric-card">
          <h3>Storage Capacity</h3>
          <p>85% Utilized</p>
        </div>
      </div>

      <div className="chart-container">
        <h2>Monthly Inventory Movement</h2>
        <div className="chart-placeholder"></div>
      </div>

      <div className="recent-activity">
        <h2>Recent Activities</h2>
        <div className="activity-list">
          <div className="activity-item">
            <span>New shipment received</span>
            <span>2h ago</span>
          </div>
          {/* More activity items */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;