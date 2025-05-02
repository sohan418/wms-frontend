import React, { useState, useRef, useEffect } from 'react';
import { FiFilter, FiCheck } from 'react-icons/fi';
import './FilterDropdown.css';

const FilterDropdown = ({ columns, visibleColumns, onChange }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  const handleToggle = (key) => {
    if (visibleColumns.includes(key)) {
      onChange(visibleColumns.filter(col => col !== key));
    } else {
      onChange([...visibleColumns, key]);
    }
  };

  return (
    <div className="filter-dropdown-container" ref={dropdownRef}>
      <button className="filter-dropdown-btn" onClick={() => setOpen(!open)}>
        <FiFilter />
        Filters
      </button>
      {open && (
        <div className="filter-dropdown-menu">
          {columns.map(col => (
            <label key={col.key} className="filter-dropdown-item">
              <input
                type="checkbox"
                checked={visibleColumns.includes(col.key)}
                onChange={() => handleToggle(col.key)}
              />
              <span>{col.header}</span>
              {visibleColumns.includes(col.key) && <FiCheck className="checked-icon" />}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;