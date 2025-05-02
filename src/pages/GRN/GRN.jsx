import React, { useState } from 'react';
import { FiMoreVertical } from 'react-icons/fi';
import './GRN.css';
import CreateGRNModal from '../../components/CreateGRNModal/CreateGRNModal';
import Table from '../../components/Table/Table';
import Button from '../../components/Button/Button';

const GRN = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [showActions, setShowActions] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const stats = [
    { label: 'Total GRN', value: '1,234' },
    { label: 'Pending', value: '45' },
    { label: 'Processing', value: '28' },
    { label: 'Completed', value: '1,161' }
  ];

  const grnData = [
    { id: 'GRN001', date: '2024-01-01', supplier: 'ABC Suppliers', items: 10, status: 'pending', value: '$2,000' },
    { id: 'GRN002', date: '2024-01-02', supplier: 'XYZ Traders', items: 8, status: 'approved', value: '$1,600' },
    { id: 'GRN003', date: '2024-01-03', supplier: 'Global Imports', items: 12, status: 'pending', value: '$2,400' },
    { id: 'GRN004', date: '2024-01-04', supplier: 'Quick Supplies Ltd.', items: 15, status: 'rejected', value: '$3,000' },
    { id: 'GRN005', date: '2024-01-05', supplier: 'Alpha Traders', items: 9, status: 'approved', value: '$1,800' },
    { id: 'GRN006', date: '2024-01-06', supplier: 'Sigma Supplies', items: 11, status: 'pending', value: '$2,200' },
    { id: 'GRN007', date: '2024-01-07', supplier: 'ABC Suppliers', items: 14, status: 'approved', value: '$2,800' },
    { id: 'GRN008', date: '2024-01-08', supplier: 'XYZ Traders', items: 7, status: 'pending', value: '$1,400' },
    { id: 'GRN009', date: '2024-01-09', supplier: 'Global Imports', items: 10, status: 'approved', value: '$2,000' },
    { id: 'GRN010', date: '2024-01-10', supplier: 'Quick Supplies Ltd.', items: 13, status: 'rejected', value: '$2,600' },
    { id: 'GRN011', date: '2024-01-11', supplier: 'Alpha Traders', items: 6, status: 'pending', value: '$1,200' },
    { id: 'GRN012', date: '2024-01-12', supplier: 'Sigma Supplies', items: 15, status: 'approved', value: '$3,000' },
    { id: 'GRN013', date: '2024-01-13', supplier: 'ABC Suppliers', items: 11, status: 'approved', value: '$2,200' },
    { id: 'GRN014', date: '2024-01-14', supplier: 'XYZ Traders', items: 9, status: 'pending', value: '$1,800' },
    { id: 'GRN015', date: '2024-01-15', supplier: 'Global Imports', items: 8, status: 'approved', value: '$1,600' },
    { id: 'GRN016', date: '2024-01-16', supplier: 'Quick Supplies Ltd.', items: 10, status: 'rejected', value: '$2,000' },
    { id: 'GRN017', date: '2024-01-17', supplier: 'Alpha Traders', items: 13, status: 'pending', value: '$2,600' },
    { id: 'GRN018', date: '2024-01-18', supplier: 'Sigma Supplies', items: 7, status: 'approved', value: '$1,400' },
    { id: 'GRN019', date: '2024-01-19', supplier: 'ABC Suppliers', items: 12, status: 'approved', value: '$2,400' },
    { id: 'GRN020', date: '2024-01-20', supplier: 'XYZ Traders', items: 10, status: 'pending', value: '$2,000' },
    { id: 'GRN021', date: '2024-01-21', supplier: 'Global Imports', items: 14, status: 'approved', value: '$2,800' },
    { id: 'GRN022', date: '2024-01-22', supplier: 'Quick Supplies Ltd.', items: 6, status: 'rejected', value: '$1,200' },
    { id: 'GRN023', date: '2024-01-23', supplier: 'Alpha Traders', items: 11, status: 'pending', value: '$2,200' },
    { id: 'GRN024', date: '2024-01-24', supplier: 'Sigma Supplies', items: 9, status: 'approved', value: '$1,800' },
    { id: 'GRN025', date: '2024-01-25', supplier: 'ABC Suppliers', items: 13, status: 'pending', value: '$2,600' },
    { id: 'GRN026', date: '2024-01-26', supplier: 'XYZ Traders', items: 10, status: 'approved', value: '$2,000' },
    { id: 'GRN027', date: '2024-01-27', supplier: 'Global Imports', items: 8, status: 'pending', value: '$1,600' },
    { id: 'GRN028', date: '2024-01-28', supplier: 'Quick Supplies Ltd.', items: 12, status: 'approved', value: '$2,400' },
    { id: 'GRN029', date: '2024-01-29', supplier: 'Alpha Traders', items: 15, status: 'rejected', value: '$3,000' },
    { id: 'GRN030', date: '2024-01-30', supplier: 'Sigma Supplies', items: 11, status: 'pending', value: '$2,200' },
    { id: 'GRN031', date: '2024-01-31', supplier: 'ABC Suppliers', items: 14, status: 'approved', value: '$2,800' },
    { id: 'GRN032', date: '2024-02-01', supplier: 'XYZ Traders', items: 7, status: 'rejected', value: '$1,400' },
    { id: 'GRN033', date: '2024-02-02', supplier: 'Global Imports', items: 10, status: 'approved', value: '$2,000' },
    { id: 'GRN034', date: '2024-02-03', supplier: 'Quick Supplies Ltd.', items: 9, status: 'pending', value: '$1,800' },
    { id: 'GRN035', date: '2024-02-04', supplier: 'Alpha Traders', items: 13, status: 'approved', value: '$2,600' },
    { id: 'GRN036', date: '2024-02-05', supplier: 'Sigma Supplies', items: 8, status: 'pending', value: '$1,600' },
    { id: 'GRN037', date: '2024-02-06', supplier: 'ABC Suppliers', items: 12, status: 'approved', value: '$2,400' },
    { id: 'GRN038', date: '2024-02-07', supplier: 'XYZ Traders', items: 10, status: 'pending', value: '$2,000' },
    { id: 'GRN039', date: '2024-02-08', supplier: 'Global Imports', items: 11, status: 'approved', value: '$2,200' },
    { id: 'GRN040', date: '2024-02-09', supplier: 'Quick Supplies Ltd.', items: 14, status: 'rejected', value: '$2,800' },
    { id: 'GRN041', date: '2024-02-10', supplier: 'Alpha Traders', items: 7, status: 'pending', value: '$1,400' },
    { id: 'GRN042', date: '2024-02-11', supplier: 'Sigma Supplies', items: 10, status: 'approved', value: '$2,000' },
    { id: 'GRN043', date: '2024-02-12', supplier: 'ABC Suppliers', items: 13, status: 'pending', value: '$2,600' },
    { id: 'GRN044', date: '2024-02-13', supplier: 'XYZ Traders', items: 8, status: 'approved', value: '$1,600' },
    { id: 'GRN045', date: '2024-02-14', supplier: 'Global Imports', items: 9, status: 'pending', value: '$1,800' },
    { id: 'GRN046', date: '2024-02-15', supplier: 'Quick Supplies Ltd.', items: 12, status: 'approved', value: '$2,400' },
    { id: 'GRN047', date: '2024-02-16', supplier: 'Alpha Traders', items: 10, status: 'rejected', value: '$2,000' },
    { id: 'GRN048', date: '2024-02-17', supplier: 'Sigma Supplies', items: 11, status: 'pending', value: '$2,200' },
    { id: 'GRN049', date: '2024-02-18', supplier: 'ABC Suppliers', items: 15, status: 'approved', value: '$3,000' },
    { id: 'GRN050', date: '2024-02-19', supplier: 'XYZ Traders', items: 6, status: 'pending', value: '$1,200' }
  ];
  

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const getStatusBadgeClass = (status) => {
    const statusMap = {
      pending: 'status-pending',
      completed: 'status-completed',
      processing: 'status-processing',
      cancelled: 'status-cancelled'
    };
    return `status-badge ${statusMap[status] || ''}`;
  };

  const handleCreateGRN = (formData) => {
    console.log('New GRN:', formData);
    // Add your API integration here
    setIsCreateModalOpen(false);
  };

  const columns = [
    { key: 'id', header: 'GRN ID', sortable: true },
    { key: 'date', header: 'Date', sortable: true },
    { key: 'supplier', header: 'Supplier', sortable: true },
    { key: 'items', header: 'Items', sortable: true },
    { key: 'value', header: 'Value', sortable: true },
    { 
      key: 'status', 
      header: 'Status',
      sortable: true,
      render: (row) => (
        <span className={getStatusBadgeClass(row.status)}>
          {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
        </span>
      )
    },
    {
      key: 'actions',
      header: '',
      render: (row) => (
        <div className="actions-cell" style={{ position: 'relative' }}>
          <button 
            className="sku-actions-btn"
            onClick={(e) => {
              e.stopPropagation();
              setShowActions(showActions === row.id ? null : row.id);
            }}
          >
            <FiMoreVertical />
          </button>
          {showActions === row.id && (
            <div className="sku-actions-dropdown">
              <button onClick={() => window.location.href = `/sku/${row.sku}`}>View</button>
              <button onClick={() => alert(`Edit ${row.sku}`)}>Edit</button>
              <button onClick={() => alert(`Delete ${row.sku}`)}>Delete</button>
            </div>
          )}
        </div>
      )
    }
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Goods Receipt Notes</h1>
        <div className="header-actions">
          <Button 
            variant="primary" 
            onClick={() => setIsCreateModalOpen(true)}
          >
            Create New GRN
          </Button>
        </div>
      </div>

      <div className="sku-stats-cards">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-value">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="tabs-container">
        <div className="tabs">
          <button 
            className={`tab ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => handleTabChange('all')}
          >
            All
          </button>
          <button 
            className={`tab ${activeTab === 'pending' ? 'active' : ''}`}
            onClick={() => handleTabChange('pending')}
          >
            Pending
          </button>
          <button 
            className={`tab ${activeTab === 'processing' ? 'active' : ''}`}
            onClick={() => handleTabChange('processing')}
          >
            Processing
          </button>
          <button 
            className={`tab ${activeTab === 'completed' ? 'active' : ''}`}
            onClick={() => handleTabChange('completed')}
          >
            Completed
          </button>
        </div>
      </div>

      <Table
        data={grnData}
        columns={columns}
        searchPlaceholder="Search GRN..."
        onRowClick={() => {}}
        itemsPerPage={10}
      />

      <CreateGRNModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateGRN}
      />
    </div>
  );
};

export default GRN;