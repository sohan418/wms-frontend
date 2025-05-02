import React, { useState } from 'react';
import Modal from '../Modal/Modal';
import { Input } from '../Form/Input';
import { Dropdown } from '../Form/Dropdown';
import Button from '../Button/Button';
import './CreateGRNModal.css';

const CreateGRNModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    grnNumber: '',
    supplier: '',
    purchaseOrder: '',
    deliveryDate: '',
    items: [{ sku: '', quantity: '', batch: '', expiryDate: '' }],
    remarks: ''
  });

  const [errors, setErrors] = useState({});

  const suppliers = [
    { value: 'supplier-1', label: 'ABC Suppliers' },
    { value: 'supplier-2', label: 'XYZ Distributors' },
    { value: 'supplier-3', label: 'Global Materials Inc' }
  ];

  const validateForm = () => {
    const newErrors = {};
    if (!formData.grnNumber) newErrors.grnNumber = 'GRN Number required';
    if (!formData.supplier) newErrors.supplier = 'Supplier required';
    if (!formData.deliveryDate) newErrors.deliveryDate = 'Delivery date required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      onSubmit(formData);
      onClose();
    } else {
      setErrors(validationErrors);
    }
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { sku: '', quantity: '', batch: '', expiryDate: '' }]
    });
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index][field] = value;
    setFormData({ ...formData, items: newItems });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New GRN">
      <form onSubmit={handleSubmit} className="create-grn-form">
        <div className="form-grid">
          <Input
            label="GRN Number *"
            value={formData.grnNumber}
            onChange={(e) => setFormData({...formData, grnNumber: e.target.value})}
            error={errors.grnNumber}
          />

          <Dropdown
            label="Supplier *"
            options={suppliers}
            value={formData.supplier}
            onChange={(e) => setFormData({...formData, supplier: e.target.value})}
            error={errors.supplier}
          />

          <Input
            label="Purchase Order No."
            value={formData.purchaseOrder}
            onChange={(e) => setFormData({...formData, purchaseOrder: e.target.value})}
          />

          <Input
            label="Delivery Date *"
            type="date"
            value={formData.deliveryDate}
            onChange={(e) => setFormData({...formData, deliveryDate: e.target.value})}
            error={errors.deliveryDate}
          />

          <div className="form-group full-width">
            <h3>Received Items</h3>
            {formData.items.map((item, index) => (
              <div key={index} className="item-grid">
                <Input
                  label="SKU Code"
                  value={item.sku}
                  onChange={(e) => handleItemChange(index, 'sku', e.target.value)}
                />
                <Input
                  label="Quantity"
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                />
                <Input
                  label="Batch No."
                  value={item.batch}
                  onChange={(e) => handleItemChange(index, 'batch', e.target.value)}
                />
                <Input
                  label="Expiry Date"
                  type="date"
                  value={item.expiryDate}
                  onChange={(e) => handleItemChange(index, 'expiryDate', e.target.value)}
                />
              </div>
            ))}
            <Button
              type="button"
              variant="secondary"
              onClick={addItem}
              className="add-item-btn"
            >
              + Add Item
            </Button>
          </div>

          <Input
            label="Remarks"
            type="textarea"
            rows="3"
            value={formData.remarks}
            onChange={(e) => setFormData({...formData, remarks: e.target.value})}
            className="full-width"
          />
        </div>

        <div className="form-actions">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            Create GRN
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateGRNModal;