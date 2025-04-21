import React, { useState } from 'react';
import './AddSKU.css';
import { Link } from 'react-router-dom';

const AddSKU = () => {
  const [formData, setFormData] = useState({
    sku: '',
    name: '',
    description: '',
    quantity: '',
    category: '',
    location: '',
    supplier: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.sku) newErrors.sku = 'SKU is required';
    if (!formData.name) newErrors.name = 'Product name is required';
    if (!formData.quantity || isNaN(formData.quantity)) 
      newErrors.quantity = 'Valid quantity is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      // Submit logic here
      console.log('Form submitted:', formData);
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 3000);
      setFormData({
        sku: '',
        name: '',
        description: '',
        quantity: '',
        category: '',
        location: '',
        supplier: ''
      });
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="add-sku-container">
      <div className="form-header">
        <Link to="/inventory" className="back-link">
          &larr; Back to Inventory
        </Link>
        <h1>Add New SKU</h1>
      </div>
      
      <form onSubmit={handleSubmit} className="sku-form">
        <div className="form-grid">
          <div className="form-group">
            <label>SKU Number *</label>
            <input
              type="text"
              value={formData.sku}
              onChange={(e) => setFormData({...formData, sku: e.target.value})}
            />
            {errors.sku && <span className="error">{errors.sku}</span>}
          </div>

          <div className="form-group">
            <label>Product Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>

          <div className="form-group full-width">
            <label>Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows="3"
            />
          </div>

          <div className="form-group">
            <label>Quantity *</label>
            <input
              type="number"
              value={formData.quantity}
              onChange={(e) => setFormData({...formData, quantity: e.target.value})}
            />
            {errors.quantity && <span className="error">{errors.quantity}</span>}
          </div>

          <div className="form-group">
            <label>Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
            >
              <option value="">Select Category</option>
              <option value="electronics">Electronics</option>
              <option value="tools">Tools</option>
              <option value="materials">Materials</option>
            </select>
          </div>

          <div className="form-group">
            <label>Storage Location</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
            />
          </div>

          <div className="form-group">
            <label>Supplier</label>
            <input
              type="text"
              value={formData.supplier}
              onChange={(e) => setFormData({...formData, supplier: e.target.value})}
            />
          </div>
        </div>

        <button type="submit" className="submit-btn">
          Add SKU
        </button>
        
        {isSubmitted && <div className="success-message">SKU added successfully!</div>}
      </form>
    </div>
  );
};

export default AddSKU;