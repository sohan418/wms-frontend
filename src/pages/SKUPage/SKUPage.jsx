import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SKUPage.css';
import Table from '../../components/Table/Table';
import Button from '../../components/Button/Button';
import { FiPlus, FiDownload, FiMoreVertical } from 'react-icons/fi';
import FilterDropdown from '../../components/FilterDropdown/FilterDropdown';
import SearchInput from '../../components/SearchInput/SearchInput';

const SKUPage = () => {
  const [activeTab, setActiveTab] = useState('all');

  // Define skuColumns first
  const skuColumns = [
    { key: 'sku', header: 'SKU', sortable: true },
    { key: 'name', header: 'Product Name', sortable: true },
    { 
      key: 'status', 
      header: 'Stock Status',
      sortable: true,
      render: (row) => (
        <span className={`status-badge status-${row.status.toLowerCase().replace(' ', '-')}`}>
          {row.status}
        </span>
      )
    },
    { key: 'quantity', header: 'Quantity', sortable: true },
    { key: 'location', header: 'Location', sortable: true },
    { key: 'auditDate', header: 'Last Audited', sortable: true },
    {
      key: 'actions',
      header: '',
      render: (row) => (
        <div style={{ position: 'relative' }}>
          <button
            className="sku-actions-btn"
            onClick={e => {
              e.stopPropagation();
              setOpenMenuId(openMenuId === row.id ? null : row.id);
            }}
          >
            <FiMoreVertical />
          </button>
          {openMenuId === row.id && (
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

  // Now you can safely use skuColumns here
  const [visibleColumns, setVisibleColumns] = useState(skuColumns.map(col => col.key));
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [openMenuId, setOpenMenuId] = useState(null);

  // Sample data with IDs for each item
  const skuData = [
    { id: 1, sku: 'SKU-001', name: 'Widget A', quantity: 150, location: 'A1-12', status: 'In Stock', auditDate: '2024-03-15' },
    { id: 2, sku: 'SKU-002', name: 'Gadget B', quantity: 23, location: 'B3-05', status: 'Low Stock', auditDate: '2024-03-10' },
    { id: 3, sku: 'SKU-003', name: 'Industrial Bearing', quantity: 45, location: 'C2-08', status: 'In Stock', auditDate: '2024-03-05' },
    { id: 4, sku: 'SKU-004', name: 'Hydraulic Hose', quantity: 12, location: 'D4-15', status: 'Low Stock', auditDate: '2024-02-28' },
    { id: 5, sku: 'SKU-005', name: 'Safety Gloves', quantity: 200, location: 'E1-03', status: 'In Stock', auditDate: '2024-02-20' },
    { id: 6, sku: 'SKU-006', name: 'Steel Cable', quantity: 8, location: 'F3-22', status: 'Low Stock', auditDate: '2024-02-18' },
    { id: 7, sku: 'SKU-007', name: 'LED Worklight', quantity: 35, location: 'G2-11', status: 'In Stock', auditDate: '2024-02-15' },
    { id: 8, sku: 'SKU-008', name: 'Toolbox Set', quantity: 5, location: 'H4-09', status: 'Low Stock', auditDate: '2024-02-10' },
    { id: 9, sku: 'SKU-009', name: 'Retired Item', quantity: 0, location: 'Z1-00', status: 'Archived', auditDate: '2024-02-15' },
  ];
  
  // Filter data based on active tab
  // --- Filtering logic ---
  const filteredSKUs = skuData.filter(item => {
    // Tab filter
    if (activeTab === 'low-stock' && item.status !== 'Low Stock') return false;
    if (activeTab === 'archived' && item.status !== 'Archived') return false;
    // Status filter
    if (statusFilter !== 'all' && item.status !== statusFilter) return false;
    // Search filter
    if (search && !item.name.toLowerCase().includes(search.toLowerCase()) && !item.sku.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }
    return true;
  });

  const handleRowClick = (row) => {
    // Navigate to SKU details page
    window.location.href = `/sku/${row.sku}`;
  };
  
  return (
    <div className="sku-page-container">
      <div className="page-header">
        <div className="header-title-section">
          <h1>SKU</h1>
        </div>
        <div className="header-actions">
          <FilterDropdown
            columns={skuColumns}
            visibleColumns={visibleColumns}
            onChange={setVisibleColumns}
          />
          <Link className="add-sku-link">
          <Button variant="secondary" className="action-button">
            <FiDownload /> Export
          </Button>
          </Link>
          <Link to="/add-sku" className="add-sku-link">
            <Button variant="primary" className="add-sku-button">
              <FiPlus /> New SKU
            </Button>
          </Link>
        </div>
      </div>

      {/* --- Filter Bar --- */}
     
      {/* --- End Filter Bar --- */}

      <div className="sku-stats-cards">
        <div className="stat-card">
          <div className="stat-value">{skuData.length}</div>
          <div className="stat-label">Total SKUs</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{skuData.filter(item => item.status === 'Low Stock').length}</div>
          <div className="stat-label">Low Stock</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{skuData.filter(item => item.status === 'In Stock').length}</div>
          <div className="stat-label">In Stock</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{skuData.filter(item => item.status === 'Archived').length}</div>
          <div className="stat-label">Archived</div>
        </div>
      </div>
      
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

      <Table
        data={filteredSKUs}
        columns={skuColumns.filter(col => visibleColumns.includes(col.key) || col.key === 'actions')}
        searchPlaceholder="Search SKUs..."
        onRowClick={handleRowClick}
        itemsPerPage={5}
      />
    </div>
  );
};

export default SKUPage;