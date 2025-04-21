import React from 'react';
import { Link } from 'react-router-dom';
import './SKUTable.css';

// Update header cells to include sorting
// Update component props destructuring
const SKUTable = ({ 
  data, 
  sortField, 
  sortOrder, 
  onSort,
  currentPage,
  totalPages,
  onPageChange 
}) => {
  return (
    <div className="sku-table-container">
      <div className="table-wrapper">
        <div className="sku-table">
          <div className="table-header">
            <div className="header-cell" onClick={() => onSort('sku')}>
              SKU {sortField === 'sku' && (sortOrder === 'asc' ? '▲' : '▼')}
            </div>
            <div className="header-cell" onClick={() => onSort('name')}>
              Product Name {sortField === 'name' && (sortOrder === 'asc' ? '▲' : '▼')}
            </div>
            <div className="header-cell" onClick={() => onSort('category')}>
              Category {sortField === 'category' && (sortOrder === 'asc' ? '▲' : '▼')}
            </div>
            <div className="header-cell" onClick={() => onSort('quantity')}>
              Quantity {sortField === 'quantity' && (sortOrder === 'asc' ? '▲' : '▼')}
            </div>
            <div className="header-cell" onClick={() => onSort('location')}>
              Location {sortField === 'location' && (sortOrder === 'asc' ? '▲' : '▼')}
            </div>
            <div className="header-cell" onClick={() => onSort('status')}>
              Status {sortField === 'status' && (sortOrder === 'asc' ? '▲' : '▼')}
            </div>
          </div>

          {data.map((item, index) => (
            <div className="table-row" key={index}>
              <div className="cell">
                <Link to={`/sku/${item.sku}`} className="sku-link">
                  {item.sku}
                </Link>
              </div>
              <div className="cell">{item.name}</div>
              <div className="cell">{item.category}</div>
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
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SKUTable;