import React, { useState } from 'react';
import Modal from '../Modal/Modal';
import './CreateOrderModal.css';

const CreateOrderModal = ({ isOpen, onClose, onSubmit }) => {
  const [orderData, setOrderData] = useState({
    customerName: '',
    products: [{ name: '', quantity: 1, price: '' }],
    status: 'Pending',
    shippingAddress: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProductChange = (index, field, value) => {
    const newProducts = [...orderData.products];
    newProducts[index] = {
      ...newProducts[index],
      [field]: value
    };
    setOrderData(prev => ({
      ...prev,
      products: newProducts
    }));
  };

  const addProduct = () => {
    setOrderData(prev => ({
      ...prev,
      products: [...prev.products, { name: '', quantity: 1, price: '' }]
    }));
  };

  const removeProduct = (index) => {
    setOrderData(prev => ({
      ...prev,
      products: prev.products.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(orderData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Order">
      <form onSubmit={handleSubmit} className="create-order-form">
        <div className="form-group">
          <label htmlFor="customerName">Customer Name</label>
          <input
            type="text"
            id="customerName"
            name="customerName"
            value={orderData.customerName}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Products</label>
          {orderData.products.map((product, index) => (
            <div key={index} className="product-row">
              <input
                type="text"
                placeholder="Product Name"
                value={product.name}
                onChange={(e) => handleProductChange(index, 'name', e.target.value)}
                required
              />
              <input
                type="number"
                placeholder="Quantity"
                value={product.quantity}
                onChange={(e) => handleProductChange(index, 'quantity', e.target.value)}
                min="1"
                required
              />
              <input
                type="number"
                placeholder="Price"
                value={product.price}
                onChange={(e) => handleProductChange(index, 'price', e.target.value)}
                step="0.01"
                min="0"
                required
              />
              {orderData.products.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeProduct(index)}
                  className="remove-product-btn"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={addProduct} className="add-product-btn">
            Add Product
          </button>
        </div>

        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={orderData.status}
            onChange={handleInputChange}
          >
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Completed">Completed</option>
            <option value="Shipped">Shipped</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="shippingAddress">Shipping Address</label>
          <textarea
            id="shippingAddress"
            name="shippingAddress"
            value={orderData.shippingAddress}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-actions">
          <button type="button" onClick={onClose} className="cancel-btn">
            Cancel
          </button>
          <button type="submit" className="submit-btn">
            Create Order
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateOrderModal;