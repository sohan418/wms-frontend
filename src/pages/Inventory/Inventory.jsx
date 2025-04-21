import React, { useState } from 'react';
import './Inventory.css';
import { Link } from 'react-router-dom';

const Inventory = () => {
  const [sortField, setSortField] = useState('sku');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1); // Add state
  const itemsPerPage = 10;

  // Sample inventory data
  const inventoryData = [
    { sku: 'SKU-001', name: 'Widget A', quantity: 150, location: 'A1-12', status: 'In Stock' },
    { sku: 'SKU-002', name: 'Gadget B', quantity: 23, location: 'B3-05', status: 'Low Stock' },
    { sku: 'SKU-003', name: 'Tool C', quantity: 0, location: 'C2-08', status: 'Out of Stock' },
    { sku: 'SKU-004', name: 'Part D', quantity: 45, location: 'D4-15', status: 'In Stock' },
    { sku: 'SKU-005', name: 'Component E', quantity: 12, location: 'E1-03', status: 'Low Stock' },
    { sku: 'SKU-006', name: 'Module F', quantity: 87, location: 'F3-22', status: 'In Stock' },
    { sku: 'SKU-007', name: 'Unit G', quantity: 5, location: 'G2-11', status: 'Low Stock' },
    { sku: 'SKU-008', name: 'Device H', quantity: 32, location: 'H4-09', status: 'In Stock' },
    { sku: 'SKU-009', name: 'System I', quantity: 0, location: 'I1-07', status: 'Out of Stock' },
    { sku: 'SKU-010', name: 'Kit J', quantity: 19, location: 'J3-14', status: 'Low Stock' },
    { sku: 'SKU-011', name: 'Set K', quantity: 200, location: 'K2-18', status: 'In Stock' },
    { sku: 'SKU-012', name: 'Pack L', quantity: 8, location: 'L4-06', status: 'Low Stock' },
    { sku: 'SKU-013', name: 'Bundle M', quantity: 43, location: 'M1-13', status: 'In Stock' },
    { sku: 'SKU-014', name: 'Assembly N', quantity: 0, location: 'N3-20', status: 'Out of Stock' },
    { sku: 'SKU-015', name: 'Unit O', quantity: 27, location: 'O2-16', status: 'In Stock' },
    { sku: 'SKU-016', name: 'Part P', quantity: 6, location: 'P4-02', status: 'Low Stock' },
    { sku: 'SKU-017', name: 'Component Q', quantity: 92, location: 'Q1-19', status: 'In Stock' },
    { sku: 'SKU-018', name: 'Module R', quantity: 14, location: 'R3-10', status: 'Low Stock' },
    { sku: 'SKU-019', name: 'Device S', quantity: 0, location: 'S2-17', status: 'Out of Stock' },
    { sku: 'SKU-020', name: 'System T', quantity: 38, location: 'T4-21', status: 'In Stock' },
  ];

  const [activeFilter, setActiveFilter] = useState('all');
  
  // Enhanced filter functionality
  // Add sorting functionality to filteredItems
  const filteredItems = inventoryData.filter(item => {
    const matchesSearch = item.sku.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'all' || 
                         item.status.toLowerCase() === activeFilter;
    return matchesSearch && matchesFilter;
  }).sort((a, b) => {
    if (sortField === 'quantity') {
      return a[sortField] - b[sortField];
    }
    return a[sortField].localeCompare(b[sortField]);
  });

  // Add pagination calculations
  const pageCount = Math.ceil(filteredItems.length / itemsPerPage);
  const currentItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="inventory-container">
      <div className="inventory-header">
        <h1>Inventory Management</h1>
        <div className="search-box">
          <input
            type="text"
            placeholder="Search SKU or Product Name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Add filter chips */}
      <div className="filter-chips">
        <button 
          className={`chip ${activeFilter === 'all' ? 'active' : ''}`}
          onClick={() => setActiveFilter('all')}
        >
          All ({inventoryData.length})
        </button>
        <button 
          className={`chip ${activeFilter === 'low stock' ? 'active' : ''}`}
          onClick={() => setActiveFilter('low stock')}
        >
          Low Stock ({inventoryData.filter(i => i.status === 'Low Stock').length})
        </button>
        <button 
          className={`chip ${activeFilter === 'out of stock' ? 'active' : ''}`}
          onClick={() => setActiveFilter('out of stock')}
        >
          Out of Stock ({inventoryData.filter(i => i.status === 'Out of Stock').length})
        </button>
      </div>

      {/* Updated table with pagination */}
      <div className="table-wrapper">
        <div className="inventory-table">
          <div className="table-header">
            <div className="header-cell" onClick={() => setSortField('sku')}>
              SKU {sortField === 'sku' && '▼'}
            </div>
            <div className="header-cell" onClick={() => setSortField('name')}>
              Product Name {sortField === 'name' && '▼'}
            </div>
            <div className="header-cell" onClick={() => setSortField('quantity')}>
              Quantity {sortField === 'quantity' && '▼'}
            </div>
            <div className="header-cell" onClick={() => setSortField('location')}>
              Location {sortField === 'location' && '▼'}
            </div>
            <div className="header-cell">Status</div>
          </div>

          {currentItems.map((item, index) => (
            <div className="table-row" key={index}>
              <div className="cell">
                <Link to={`/sku/${item.sku}`} className="sku-link">
                  {item.sku}
                </Link>
              </div>
              <div className="cell">{item.name}</div>
              <div className="cell">{item.quantity}</div>
              <div className="cell">{item.location}</div>
              <div className={`cell status ${item.status.toLowerCase().replace(' ', '-')}`}>
                {item.status}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination controls */}
      <div className="pagination">
        <button 
          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>Page {currentPage} of {pageCount}</span>
        <button
          onClick={() => setCurrentPage(p => Math.min(pageCount, p + 1))}
          disabled={currentPage === pageCount}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Inventory;