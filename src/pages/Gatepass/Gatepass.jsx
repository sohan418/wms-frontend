import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Gatepass.css';

const Gatepass = () => {
  const [formData, setFormData] = useState({
    name: '',
    department: '',
    purpose: '',
    items: [{ description: '', quantity: '' }],
    exitTime: '',
    returnTime: '',
    authorizedBy: ''
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.purpose) newErrors.purpose = 'Purpose is required';
    if (!formData.exitTime) newErrors.exitTime = 'Exit time is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      console.log('Gatepass submitted:', formData);
      // Add submission logic here
    } else {
      setErrors(validationErrors);
    }
  };

  const addItemField = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { description: '', quantity: '' }]
    });
  };

  return (
    <div className="gatepass-container">
      <div className="form-header">
        <Link to="/" className="back-link">
          &larr; Back to Dashboard
        </Link>
        <h1>Create New Gatepass</h1>
      </div>

      <form onSubmit={handleSubmit} className="gatepass-form">
        <div className="form-grid">
          <div className="form-group">
            <label>Requester Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label>Department</label>
            <select
              value={formData.department}
              onChange={(e) => setFormData({...formData, department: e.target.value})}
            >
              <option value="">Select Department</option>
              <option value="warehouse">Warehouse</option>
              <option value="logistics">Logistics</option>
              <option value="quality">Quality Control</option>
            </select>
          </div>

          <div className="form-group full-width">
            <label>Purpose of Exit *</label>
            <textarea
              value={formData.purpose}
              onChange={(e) => setFormData({...formData, purpose: e.target.value})}
              rows="3"
            />
            {errors.purpose && <span className="error">{errors.purpose}</span>}
          </div>

          <div className="form-group full-width">
            <label>Items to Remove</label>
            {formData.items.map((item, index) => (
              <div key={index} className="item-row">
                <input
                  type="text"
                  placeholder="Item description"
                  value={item.description}
                  onChange={(e) => {
                    const newItems = [...formData.items];
                    newItems[index].description = e.target.value;
                    setFormData({...formData, items: newItems});
                  }}
                />
                <input
                  type="number"
                  placeholder="Qty"
                  value={item.quantity}
                  onChange={(e) => {
                    const newItems = [...formData.items];
                    newItems[index].quantity = e.target.value;
                    setFormData({...formData, items: newItems});
                  }}
                />
              </div>
            ))}
            <button type="button" onClick={addItemField} className="add-item-btn">
              + Add Item
            </button>
          </div>

          <div className="form-group">
            <label>Estimated Exit Time *</label>
            <input
              type="datetime-local"
              value={formData.exitTime}
              onChange={(e) => setFormData({...formData, exitTime: e.target.value})}
            />
            {errors.exitTime && <span className="error">{errors.exitTime}</span>}
          </div>

          <div className="form-group">
            <label>Expected Return Time</label>
            <input
              type="datetime-local"
              value={formData.returnTime}
              onChange={(e) => setFormData({...formData, returnTime: e.target.value})}
            />
          </div>

          <div className="form-group">
            <label>Authorized By *</label>
            <input
              type="text"
              value={formData.authorizedBy}
              onChange={(e) => setFormData({...formData, authorizedBy: e.target.value})}
            />
          </div>
        </div>

        <button type="submit" className="submit-btn">
          Generate Gatepass
        </button>
      </form>
    </div>
  );
};

export default Gatepass;