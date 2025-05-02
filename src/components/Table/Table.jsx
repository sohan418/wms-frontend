import React, { useState } from 'react';
import './Table.css';
import { FiSearch, FiFilter, FiMoreVertical, FiChevronDown, FiChevronUp, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const Table = ({ 
  data, 
  columns, 
  title, 
  subtitle,
  searchPlaceholder = "Search...",
  showActions = true,
  onRowClick,
  itemsPerPage = 10
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  
  // Handle sorting
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };
  
  // Sort and filter data
  const sortedData = React.useMemo(() => {
    let sortableData = [...data];
    
    // Filter data based on search term
    if (searchTerm) {
      sortableData = sortableData.filter(item => 
        Object.values(item).some(val => 
          String(val).toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
    
    // Sort data
    if (sortConfig.key) {
      sortableData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    
    return sortableData;
  }, [data, searchTerm, sortConfig]);
  
  // Pagination
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  // Reset to first page when search changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);
  
  // Handle row selection
  const handleSelectRow = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };
  
  // Handle select all
  const handleSelectAll = () => {
    if (selectedRows.length === paginatedData.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(paginatedData.map(row => row.id));
    }
  };
  
  return (
    <div className="table-container">
      {(title || subtitle) && (
        <div className="table-header">
          <div>
            {title && <h2 className="table-title">{title}</h2>}
            {subtitle && <p className="table-subtitle">{subtitle}</p>}
          </div>
          {showActions && (
            <div className="table-actions">
              <button className="filter-button">
                <FiFilter /> Filter
              </button>
              <button className="action-button">
                Export
              </button>
            </div>
          )}
        </div>
      )}
      
      <div className="table-toolbar">
        <div className="search-container">
          <FiSearch className="search-icon" />
          <input 
            type="text" 
            placeholder={searchPlaceholder} 
            className="search-input" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {selectedRows.length > 0 && (
          <div className="selected-info">
            {selectedRows.length} item{selectedRows.length !== 1 ? 's' : ''} selected
          </div>
        )}
      </div>
      
      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th className="checkbox-column">
                <input 
                  type="checkbox" 
                  checked={paginatedData.length > 0 && selectedRows.length === paginatedData.length}
                  onChange={handleSelectAll}
                />
              </th>
              {columns.map((column) => (
                <th 
                  key={column.key} 
                  className={column.sortable ? 'sortable-column' : ''}
                  onClick={() => column.sortable && handleSort(column.key)}
                >
                  {column.header}
                  {sortConfig.key === column.key && (
                    sortConfig.direction === 'asc' 
                      ? <FiChevronUp className="sort-icon" /> 
                      : <FiChevronDown className="sort-icon" />
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((row) => (
                <tr 
                  key={row.id} 
                  onClick={() => onRowClick && onRowClick(row)}
                  className={onRowClick ? 'clickable-row' : ''}
                >
                  <td onClick={(e) => e.stopPropagation()}>
                    <input 
                      type="checkbox" 
                      checked={selectedRows.includes(row.id)}
                      onChange={() => handleSelectRow(row.id)}
                    />
                  </td>
                  {columns.map((column) => (
                    <td key={column.key}>
                      {column.render ? column.render(row) : row[column.key]}
                    </td>
                  ))}
                  {/* {showActions && (
                    <td onClick={(e) => e.stopPropagation()}>
                      <button className="row-action-button">
                        <FiMoreVertical />
                      </button>
                    </td>
                  )} */}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length + (showActions ? 2 : 1)} className="no-data">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button 
            className="pagination-button"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <FiChevronLeft />
          </button>
          
          <div className="pagination-info">
            Page {currentPage} of {totalPages}
          </div>
          
          <button 
            className="pagination-button"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            <FiChevronRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default Table;