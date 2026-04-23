import React from 'react';
import { useAuth } from '../context/AuthContext';
import './ItemCard.css';

const ItemCard = ({ item, onEdit, onDelete }) => {
  const { user } = useAuth();
  const isOwner = user?._id === item.reportedBy?._id;

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: 'numeric', month: 'short', year: 'numeric'
    });
  };

  return (
    <div className={`item-card fade-in ${item.type === 'Lost' ? 'item-card-lost' : 'item-card-found'}`}>
      <div className="item-card-header">
        <span className={`tag tag-${item.type.toLowerCase()}`}>
          {item.type === 'Lost' ? '🔴' : '🟢'} {item.type}
        </span>
        {isOwner && (
          <div className="item-actions">
            <button className="btn btn-outline btn-sm" onClick={() => onEdit(item)}>✏️</button>
            <button className="btn btn-danger btn-sm" onClick={() => onDelete(item._id)}>🗑️</button>
          </div>
        )}
      </div>

      <h3 className="item-name">{item.itemName}</h3>
      <p className="item-desc">{item.description}</p>

      <div className="item-meta">
        <div className="meta-row">
          <span className="meta-icon">📍</span>
          <span>{item.location}</span>
        </div>
        <div className="meta-row">
          <span className="meta-icon">📅</span>
          <span>{formatDate(item.date)}</span>
        </div>
        <div className="meta-row">
          <span className="meta-icon">📞</span>
          <span>{item.contactInfo}</span>
        </div>
        <div className="meta-row">
          <span className="meta-icon">👤</span>
          <span>{item.reportedBy?.name || 'Unknown'}</span>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
