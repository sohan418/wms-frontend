import React, { useState } from 'react';
import './Gatepass.css';

const departments = [
  { value: 'warehouse', label: 'Warehouse' },
  { value: 'production', label: 'Production' },
  { value: 'quality', label: 'Quality Control' },
  { value: 'maintenance', label: 'Maintenance' }
];

const Gatepass = () => {
  const [formData, setFormData] = useState({
    requesterName: '',
    department: 'warehouse',
    purpose: '',
    items: [{ sku: '', quantity: '', description: '' }],
    exitTime: '',
    returnTime: '',
    authorizedBy: '',
    remarks: ''
  });

  const [errors, setErrors] = useState({});
  const [imageUrl, setImageUrl] = useState(null);
  const [driverImageUrl, setDriverImageUrl] = useState(null);
  const [vehicleImageUrl, setVehicleImageUrl] = useState(null);
  // Drag state for styling
  const [driverDragActive, setDriverDragActive] = useState(false);
  const [vehicleDragActive, setVehicleDragActive] = useState(false);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index][field] = value;
    setFormData({ ...formData, items: newItems });
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { sku: '', quantity: '', description: '' }]
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageUrl(URL.createObjectURL(file));
    }
  };
  // Drag and drop handlers for driver image
  const handleDriverDragOver = (e) => {
    e.preventDefault();
    setDriverDragActive(true);
  };
  const handleDriverDragLeave = (e) => {
    e.preventDefault();
    setDriverDragActive(false);
  };
  const handleDriverDrop = (e) => {
    e.preventDefault();
    setDriverDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setDriverImageUrl(URL.createObjectURL(file));
    }
  };
  const handleDriverImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setDriverImageUrl(URL.createObjectURL(file));
    }
  };
  
  // Drag and drop handlers for vehicle image
  const handleVehicleDragOver = (e) => {
    e.preventDefault();
    setVehicleDragActive(true);
  };
  const handleVehicleDragLeave = (e) => {
    e.preventDefault();
    setVehicleDragActive(false);
  };
  const handleVehicleDrop = (e) => {
    e.preventDefault();
    setVehicleDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setVehicleImageUrl(URL.createObjectURL(file));
    }
  };
  const handleVehicleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVehicleImageUrl(URL.createObjectURL(file));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.requesterName) newErrors.requesterName = 'Requester name is required';
    if (!formData.purpose) newErrors.purpose = 'Purpose is required';
    if (!formData.exitTime) newErrors.exitTime = 'Exit time is required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      alert('Gatepass submitted!\n' + JSON.stringify(formData, null, 2));
      // Reset form or handle as needed
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="gatepass-container">
      <div className="form-header">
        <h1>Create New Gatepass</h1>
      </div>
      {/* Image upload and preview section */}
      <div className="gp-image-upload-section">
  <label className="gp-image-upload-label" htmlFor="gp-image-upload-input">
    Upload Image
  </label>
  <input
    id="gp-image-upload-input"
    type="file"
    accept="image/*"
    className="gp-image-upload-input"
    onChange={handleImageChange}
  />
  {imageUrl && (
    <img src={imageUrl} alt="Preview" className="gp-image-preview" />
  )}
</div>
      <form className="gatepass-form dark-theme-form" onSubmit={handleSubmit} autoComplete="off">
        <div className="form-grid">
          <div>
            <label>Requester Name *</label>
            <input
              type="text"
              value={formData.requesterName}
              onChange={e => handleChange('requesterName', e.target.value)}
              className="dark-input"
              required
            />
            {errors.requesterName && <div style={{color: 'red', fontSize: '0.9em'}}>{errors.requesterName}</div>}
          </div>
          <div>
            <label>Department</label>
            <select
              value={formData.department}
              onChange={e => handleChange('department', e.target.value)}
              className="dark-input"
            >
              {departments.map(dep => (
                <option key={dep.value} value={dep.value}>{dep.label}</option>
              ))}
            </select>
          </div>
          <div className="form-group full-width">
            <label>Purpose of Exit *</label>
            <textarea
              value={formData.purpose}
              onChange={e => handleChange('purpose', e.target.value)}
              className="dark-input"
              required
              rows={3}
            />
            {errors.purpose && <div style={{color: 'red', fontSize: '0.9em'}}>{errors.purpose}</div>}
          </div>
          <div className="form-group full-width">
            <h3 style={{margin: '0 0 8px 0'}}>Items/SKUs to Remove</h3>
            {formData.items.map((item, idx) => (
              <div className="item-grid" key={idx}>
                <div>
                  <label>SKU Code</label>
                  <input
                    type="text"
                    value={item.sku}
                    onChange={e => handleItemChange(idx, 'sku', e.target.value)}
                    className="dark-input"
                  />
                </div>
                <div>
                  <label>Quantity</label>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={e => handleItemChange(idx, 'quantity', e.target.value)}
                    className="dark-input"
                  />
                </div>
                <div>
                  <label>Description</label>
                  <input
                    type="text"
                    value={item.description}
                    onChange={e => handleItemChange(idx, 'description', e.target.value)}
                    className="dark-input"
                  />
                </div>
              </div>
            ))}
            <button type="button" className="add-item-btn" onClick={addItem}>+ Add Item</button>
          </div>
          <div>
            <label>Estimated Exit Time *</label>
            <input
              type="datetime-local"
              value={formData.exitTime}
              onChange={e => handleChange('exitTime', e.target.value)}
              className="dark-input"
              required
            />
            {errors.exitTime && <div style={{color: 'red', fontSize: '0.9em'}}>{errors.exitTime}</div>}
          </div>
          <div>
            <label>Expected Return Time</label>
            <input
              type="datetime-local"
              value={formData.returnTime}
              onChange={e => handleChange('returnTime', e.target.value)}
              className="dark-input"
            />
          </div>
          <div>
            <label>Authorized By *</label>
            <input
              type="text"
              value={formData.authorizedBy}
              onChange={e => handleChange('authorizedBy', e.target.value)}
              className="dark-input"
              required
            />
          </div>
          <div>
            <label>Remarks</label>
            <textarea
              value={formData.remarks}
              onChange={e => handleChange('remarks', e.target.value)}
              className="dark-input"
              rows={2}
            />
          </div>
        </div>
        
         {/* --- Driver Image Drag-and-Drop Upload --- */}
         <div className="gp-image-upload-row" style={{marginTop: 24}}>
           {/* Driver Image */}
           <div className="gp-image-upload-section">
             <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: 'fit-content'}}>
               <span className="gp-image-upload-text-label">Driver Image</span>
               <div
                 className={`gp-image-drop-area${driverDragActive ? ' drag-active' : ''}`}
                 onDragOver={handleDriverDragOver}
                 onDragLeave={handleDriverDragLeave}
                 onDrop={handleDriverDrop}
                 onClick={() => document.getElementById('gp-driver-image-upload-input').click()}
                 tabIndex={0}
                 style={{outline: 'none'}}
               >
                 {driverImageUrl ? (
                   <img src={driverImageUrl} alt="Driver Preview" className="gp-image-preview-large" />
                 ) : (
                   <div className="gp-image-placeholder">
                     <svg width="32" height="32" fill="currentColor" viewBox="0 0 20 20" style={{opacity: 0.5}}>
                       <path d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-2.382a1 1 0 01-.894-.553l-.724-1.447A1 1 0 0011.382 3h-2.764a1 1 0 00-.894.553l-.724 1.447A1 1 0 016.382 5H4zm6 3a4 4 0 110 8 4 4 0 010-8zm0 2a2 2 0 100 4 2 2 0 000-4z"/>
                   </svg>
                   <span>Drag & Drop or Click to Upload</span>
                 </div>
               )}
               <input
                 id="gp-driver-image-upload-input"
                 type="file"
                 accept="image/*"
                 className="gp-image-upload-input"
                 onChange={handleDriverImageChange}
                 tabIndex={-1}
               />
             </div>
           </div> {/* <-- This closing div was missing */}
         </div>
         {/* Vehicle Image */}
         <div className="gp-image-upload-section">
           <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: 'fit-content'}}>
             <span className="gp-image-upload-text-label">Vehicle Image</span>
             <div
               className={`gp-image-drop-area${vehicleDragActive ? ' drag-active' : ''}`}
               onDragOver={handleVehicleDragOver}
               onDragLeave={handleVehicleDragLeave}
               onDrop={handleVehicleDrop}
               onClick={() => document.getElementById('gp-vehicle-image-upload-input').click()}
               tabIndex={0}
               style={{outline: 'none'}}
             >
               {vehicleImageUrl ? (
                 <img src={vehicleImageUrl} alt="Vehicle Preview" className="gp-image-preview-large" />
               ) : (
                 <div className="gp-image-placeholder">
                   <svg width="32" height="32" fill="currentColor" viewBox="0 0 20 20" style={{opacity: 0.5}}>
                     <path d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-2.382a1 1 0 01-.894-.553l-.724-1.447A1 1 0 0011.382 3h-2.764a1 1 0 00-.894.553l-.724 1.447A1 1 0 016.382 5H4zm6 3a4 4 0 110 8 4 4 0 010-8zm0 2a2 2 0 100 4 2 2 0 000-4z"/>
                   </svg>
                   <span>Drag & Drop or Click to Upload</span>
                 </div>
               )}
               <input
                 id="gp-vehicle-image-upload-input"
                 type="file"
                 accept="image/*"
                 className="gp-image-upload-input"
                 onChange={handleVehicleImageChange}
                 tabIndex={-1}
               />
             </div>
           </div> {/* <-- This closing div was missing */}
         </div>
         </div>
         <div className="form-actions">
           <button type="submit" className="add-item-btn" style={{marginTop: 0}}>Generate Gatepass</button>
           <button type="button" className="add-item-btn" style={{background: '#f0f2f5', color: '#4361ee'}} onClick={() => window.location.href = '/'}>Cancel</button>
         </div>
       
      </form>
    </div>
  );
};

export default Gatepass;