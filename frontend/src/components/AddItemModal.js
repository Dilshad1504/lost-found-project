import React, { useState, useEffect } from 'react';
import { createItem, updateItem } from '../api';
import './Modal.css';

const AddItemModal = ({ onClose, onSuccess, editItem }) => {
  const [form, setForm] = useState({
    itemName: '',
    description: '',
    type: 'Lost',
    location: '',
    date: new Date().toISOString().split('T')[0],
    contactInfo: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editItem) {
      setForm({
        itemName: editItem.itemName || '',
        description: editItem.description || '',
        type: editItem.type || 'Lost',
        location: editItem.location || '',
        date: editItem.date ? new Date(editItem.date).toISOString().split('T')[0] : '',
        contactInfo: editItem.contactInfo || '',
      });
    }
  }, [editItem]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { itemName, description, type, location, date, contactInfo } = form;
    if (!itemName || !description || !type || !location || !contactInfo) {
      return setError('Please fill all required fields');
    }

    setLoading(true);
    try {
      if (editItem) {
        await updateItem(editItem._id, form);
      } else {
        await createItem(form);
      }
      onSuccess();
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-box fade-in">
        <div className="modal-header">
          <h2>{editItem ? '✏️ Update Item' : '➕ Report Item'}</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        {error && <div className="alert alert-error">⚠️ {error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="grid-2">
            <div className="form-group">
              <label>Item Name *</label>
              <input
                type="text"
                name="itemName"
                placeholder="e.g. Black Wallet"
                value={form.itemName}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Type *</label>
              <select name="type" value={form.type} onChange={handleChange}>
                <option value="Lost">🔴 Lost</option>
                <option value="Found">🟢 Found</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Description *</label>
            <textarea
              name="description"
              placeholder="Describe the item clearly (color, brand, unique features...)"
              value={form.description}
              onChange={handleChange}
            />
          </div>

          <div className="grid-2">
            <div className="form-group">
              <label>Location *</label>
              <input
                type="text"
                name="location"
                placeholder="e.g. Library, Block-C"
                value={form.location}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Date *</label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Contact Info *</label>
            <input
              type="text"
              name="contactInfo"
              placeholder="Phone number or email"
              value={form.contactInfo}
              onChange={handleChange}
            />
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-outline" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? <><span className="loader"></span> Saving...</> : editItem ? '✅ Update Item' : '📢 Report Item'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItemModal;
