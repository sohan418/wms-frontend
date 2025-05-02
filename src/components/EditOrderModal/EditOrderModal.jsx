import React, { useState, useEffect } from 'react';
import Modal from '../Modal/Modal';
import './EditOrderModal.css';

const EditOrderModal = ({ isOpen, onClose, order, onSubmit }) => {
  const [formData, setFormData] = useState({
    customerName: '',
    status: '',
    totalAmount: ''
  });

  useEffect(() => {
    if (order) {
      setFormData({
        customerName: order.customerName,
        status: order.status,
        totalAmount: order.totalAmount.replace('$', '')
      });
    }
  }, [order]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...order,
      ...formData,
      totalAmount: `$${parseFloat(formData.totalAmount).toFixed(2)}`
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Order">
      <form onSubmit={handleSubmit} className="edit-order-form">
        <div className="form-group">
          <label htmlFor="orderId">Order ID</label>
          <input
            type="text"
            id="orderId"
            value={order?.orderId || ''}
            disabled
            className="disabled-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="customerName">Customer Name</label>
          <input
            type="text"
            id="customerName"
            name="customerName"
            value={formData.customerName}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            required
          >
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="totalAmount">Total Amount</label>
          <div className="amount-input-wrapper">
            <span className="currency-symbol">$</span>
            <input
              type="number"
              id="totalAmount"
              name="totalAmount"
              value={formData.totalAmount}
              onChange={handleInputChange}
              step="0.01"
              min="0"
              required
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="button" onClick={onClose} className="cancel-btn">
            Cancel
          </button>
          <button type="submit" className="submit-btn">
            Save Changes
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditOrderModal;