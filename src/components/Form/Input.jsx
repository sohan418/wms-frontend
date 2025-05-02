import React from 'react';
import './Form.css';

export const Input = ({ label, type = 'text', value, onChange, required, className, error, success }) => (
  <div className={`form-group ${className}`}>
    {label && <label>{label}{required && '*'}</label>}
    <input
      type={type}
      value={value}
      onChange={onChange}
      className={`form-input ${error ? 'error' : ''} ${success ? 'success' : ''}`}
    />
    {error && <span className="error-message">{error}</span>}
  </div>
);