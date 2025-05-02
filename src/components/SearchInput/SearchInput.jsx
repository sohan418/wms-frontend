import React from 'react';
import { FiSearch } from 'react-icons/fi';
import './SearchInput.css';

const SearchInput = ({ placeholder, value, onChange, className }) => {
  return (
    <div className="search-container">
       <FiSearch className="search-icon" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="search-input"
      />
    </div>
  );
};

export default SearchInput;