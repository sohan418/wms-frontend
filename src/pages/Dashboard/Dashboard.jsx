import React from 'react';
import SalesChart from '../../components/Charts/SalesChart';
import './Dashboard.css';

const Dashboard = () => {
  // Sample data
  const inventoryData = [
    { name: 'Widget A', value: 150 },
    { name: 'Gadget B', value: 23 },
    { name: 'Tool C', value: 45 },
    { name: 'Part D', value: 12 },
    { name: 'Component E', value: 200 },
  ];

  const orderData = [
    { month: 'Jan', orders: 45 },
    { month: 'Feb', orders: 68 },
    { month: 'Mar', orders: 72 },
    { month: 'Apr', orders: 81 },
    { month: 'May', orders: 93 },
  ];

  return (
    <div className="dashboard-container">
      <h1>Dashboard Overview</h1>
      
      <div className="chart-grid">
        <div className="chart-card">
          <h2>Inventory Levels</h2>
          <SalesChart data={inventoryData} />
        </div>
        
        <div className="chart-card">
          <h2>Monthly Orders</h2>
          <SalesChart data={orderData} dataKey="orders" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;