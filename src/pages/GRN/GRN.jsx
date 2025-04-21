import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './GRN.css';

const GRN = () => {
  const [formData, setFormData] = useState({
    grnNumber: '',
    supplier: '',
    deliveryNote: '',
    items: [{ productCode: '', description: '', quantity: '', unitPrice: '' }],
    receivedBy: '',
    inspectedBy: ''
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.grnNumber) newErrors.grnNumber = 'GRN Number is required';
    if (!formData.supplier) newErrors.supplier = 'Supplier is required';
    return newErrors;
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { productCode: '', description: '', quantity: '', unitPrice: '' }]
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      console.log('GRN submitted:', formData);
      // Add submission logic here
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="grn-container">
      <div className="form-header">
        <Link to="/inventory" className="back-link">
          &larr; Back to Inventory
        </Link>
        <h1>Goods Received Note (GRN)</h1>
      </div>

      <form onSubmit={handleSubmit} className="grn-form">
        <div className="form-section">
          <h2>Supplier Details</h2>
          <div className="form-grid">
            <div className="form-group">
              <label>GRN Number *</label>
              <input
                type="text"
                value={formData.grnNumber}
                onChange={(e) => setFormData({...formData, grnNumber: e.target.value})}
              />
              {errors.grnNumber && <span className="error">{errors.grnNumber}</span>}
            </div>
            <div className="form-group">
              <label>Supplier *</label>
              <input
                type="text"
                value={formData.supplier}
                onChange={(e) => setFormData({...formData, supplier: e.target.value})}
              />
              {errors.supplier && <span className="error">{errors.supplier}</span>}
            </div>
            <div className="form-group">
              <label>Delivery Note No.</label>
              <input
                type="text"
                value={formData.deliveryNote}
                onChange={(e) => setFormData({...formData, deliveryNote: e.target.value})}
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h2>Received Items</h2>
          {formData.items.map((item, index) => (
            <div key={index} className="item-row">
              <input
                type="text"
                placeholder="Product Code"
                value={item.productCode}
                onChange={(e) => {
                  const newItems = [...formData.items];
                  newItems[index].productCode = e.target.value;
                  setFormData({...formData, items: newItems});
                }}
              />
              <input
                type="text"
                placeholder="Description"
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
              <input
                type="number"
                placeholder="Unit Price"
                value={item.unitPrice}
                onChange={(e) => {
                  const newItems = [...formData.items];
                  newItems[index].unitPrice = e.target.value;
                  setFormData({...formData, items: newItems});
                }}
              />
            </div>
          ))}
          <button type="button" onClick={addItem} className="add-item-btn">
            + Add Item
          </button>
        </div>

        <div className="form-section">
          <h2>Receipt Details</h2>
          <div className="form-grid">
            <div className="form-group">
              <label>Received By *</label>
              <input
                type="text"
                value={formData.receivedBy}
                onChange={(e) => setFormData({...formData, receivedBy: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>Inspected By *</label>
              <input
                type="text"
                value={formData.inspectedBy}
                onChange={(e) => setFormData({...formData, inspectedBy: e.target.value})}
              />
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-btn">
            Save GRN
          </button>
          <button type="button" className="print-btn">
            Print GRN
          </button>
        </div>
      </form>
    </div>
  );
};

export default GRN;