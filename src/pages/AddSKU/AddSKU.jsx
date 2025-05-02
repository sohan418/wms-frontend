import React, { useState } from 'react';
import './AddSKU.css';
import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button';
import { Input } from '../../components/Form/Input';
import { Dropdown } from '../../components/Form/Dropdown';
import { RadioGroup } from '../../components/Form/RadioGroup';
const AddSKU = () => {
  const [formData, setFormData] = useState({
    sku: '',
    name: '',
    category: '',
    quantity: '',
    unit: 'each',
    minStock: '',
    location: '',
    supplier: '',
    barcode: '',
    expiryDate: '',
    status: 'active',
    description: ''
  });

  const categoryOptions = [
    { value: 'raw-material', label: 'Raw Material' },
    { value: 'finished-good', label: 'Finished Good' },
    { value: 'consumable', label: 'Consumable' }
  ];

  const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here
    console.log('Form submitted:', formData);
  };

  return (
    <div className="sku-form-container">
      <h1>Add New SKU</h1>
      
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          {/* Row 1 */}
          <Input
            label="SKU Code"
            type="text"
            value={formData.sku}
            onChange={(e) => setFormData({...formData, sku: e.target.value})}
            required
          />
          <Input
            label="Product Name"
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
          />

          {/* Row 2 */}
          <Dropdown
            label="Category"
            options={categoryOptions}
            value={formData.category}
            onChange={(e) => setFormData({...formData, category: e.target.value})}
          />
          <Input
            label="Initial Quantity"
            type="number"
            value={formData.quantity}
            onChange={(e) => setFormData({...formData, quantity: e.target.value})}
            required
          />

          {/* Row 3 */}
          <Dropdown
            label="Unit of Measurement"
            options={[
              { value: 'each', label: 'Each' },
              { value: 'kg', label: 'Kilogram' },
              { value: 'liter', label: 'Liter' },
              { value: 'meter', label: 'Meter' }
            ]}
            value={formData.unit}
            onChange={(e) => setFormData({...formData, unit: e.target.value})}
          />
          <Input
            label="Minimum Stock"
            type="number"
            value={formData.minStock}
            onChange={(e) => setFormData({...formData, minStock: e.target.value})}
          />

          {/* Row 4 */}
          <Input
            label="Storage Location"
            type="text"
            value={formData.location}
            onChange={(e) => setFormData({...formData, location: e.target.value})}
          />
          <Input
            label="Supplier Contact"
            type="email"
            value={formData.supplier}
            onChange={(e) => setFormData({...formData, supplier: e.target.value})}
          />

          {/* Row 5 */}
          <Input
            label="Barcode/UPC"
            type="text"
            value={formData.barcode}
            onChange={(e) => setFormData({...formData, barcode: e.target.value})}
          />
          <Input
            label="Expiry Date"
            type="date"
            value={formData.expiryDate}
            onChange={(e) => setFormData({...formData, expiryDate: e.target.value})}
          />

          {/* Full width fields */}
          <div className="form-group full-width">
            <label>Product Description</label>
            <textarea 
              rows="3"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            ></textarea>
          </div>

          <RadioGroup
            label="Status"
            name="status"
            options={statusOptions}
            value={formData.status}
            onChange={(e) => setFormData({...formData, status: e.target.value})}
            className="full-width"
          />
        </div>

        <div className="form-actions">
          <Button variant="primary" type="submit">Save SKU</Button>
          <Button variant="secondary" type="button">Cancel</Button>
        </div>
      </form>
    </div>
  );
};

export default AddSKU;