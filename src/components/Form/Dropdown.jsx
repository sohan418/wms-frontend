import React from 'react';
import './Form.css';

export const Dropdown = ({ label, options, value, onChange, required, className }) => (
  <div className={`form-group ${className}`}>
    {label && <label>{label}{required && '*'}</label>}
    <select value={value} onChange={onChange} className="form-select">
      <option value="">Select {label}</option>
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  </div>
);