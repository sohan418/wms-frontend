import React from 'react';
import './Form.css';

export const RadioGroup = ({ label, options, name, value, onChange, className }) => (
  <div className={`form-group ${className}`}>
    {label && <label>{label}</label>}
    <div className="radio-group">
      {options.map(opt => (
        <label key={opt.value} className="radio-option">
          <input
            type="radio"
            name={name}
            value={opt.value}
            checked={value === opt.value}
            onChange={onChange}
          />
          <span className="radio-label">{opt.label}</span>
        </label>
      ))}
    </div>
  </div>
);