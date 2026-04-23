import React, { useState, useEffect, useCallback } from 'react';
import { getAllItems, deleteItem, searchItems } from '../api';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import ItemCard from '../components/ItemCard';
import AddItemModal from '../components/AddItemModal';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [searchName, setSearchName] = useState('');
  const [filterType, setFilterType] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [stats, setStats] = useState({ total: 0, lost: 0, found: 0 });

  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      let res;
      if (searchName || filterType) {
        res = await searchItems(searchName, filterType);
      } else {
        res = await getAllItems();
      }
      const data = res.data.items || [];
      setItems(data);
      setStats({
        total: data.length,
        lost: data.filter(i => i.type === 'Lost').length,
        found: data.filter(i => i.type === 'Found').length,
      });
    } catch (err) {
      console.error('Failed to fetch items:', err);
    } finally {
      setLoading(false);
    }
  }, [searchName, filterType]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleDelete = async (id) => {
    try {
      await deleteItem(id);
      setDeleteConfirm(null);
      fetchItems();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete item');
    }
  };

  const handleEdit = (item) => {
    setEditItem(item);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setEditItem(null);
  };

  const handleSearchClear = () => {
    setSearchName('');
    setFilterType('');
  };

  return (
    <div className="dashboard-page">
      <Navbar />

      <main className="dashboard-main container">
        {/* Welcome Header */}
        <div className="dashboard-header fade-in">
          <div>
            <h1>Good {getGreeting()}, <span>{user?.name?.split(' ')[0]}</span> 👋</h1>
            <p>Manage lost & found items on your campus</p>
          </div>
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            ➕ Report Item
          </button>
        </div>

        {/* Stats */}
        <div className="stats-grid fade-in">
          <div className="stat-card">
            <div className="stat-icon">📦</div>
            <div className="stat-info">
              <span className="stat-number">{stats.total}</span>
              <span className="stat-label">Total Items</span>
            </div>
          </div>
          <div className="stat-card stat-lost">
            <div className="stat-icon">🔴</div>
            <div className="stat-info">
              <span className="stat-number">{stats.lost}</span>
              <span className="stat-label">Lost Items</span>
            </div>
          </div>
          <div className="stat-card stat-found">
            <div className="stat-icon">🟢</div>
            <div className="stat-info">
              <span className="stat-number">{stats.found}</span>
              <span className="stat-label">Found Items</span>
            </div>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="search-bar fade-in">
          <div className="search-input-wrap">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search items by name..."
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
          </div>
          <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
            <option value="">All Types</option>
            <option value="Lost">🔴 Lost</option>
            <option value="Found">🟢 Found</option>
          </select>
          {(searchName || filterType) && (
            <button className="btn btn-outline btn-sm" onClick={handleSearchClear}>
              ✕ Clear
            </button>
          )}
        </div>

        {/* Items Grid */}
        {loading ? (
          <div className="loading-state">
            <div className="loader" style={{ width: 40, height: 40 }}></div>
            <p>Loading items...</p>
          </div>
        ) : items.length === 0 ? (
          <div className="empty-state fade-in">
            <div className="empty-icon">🎒</div>
            <h3>{searchName || filterType ? 'No items match your search' : 'No items reported yet'}</h3>
            <p>{searchName || filterType ? 'Try different keywords or filters' : 'Be the first to report a lost or found item!'}</p>
            {!searchName && !filterType && (
              <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                ➕ Report First Item
              </button>
            )}
          </div>
        ) : (
          <div className="items-grid">
            {items.map((item) => (
              <ItemCard
                key={item._id}
                item={item}
                onEdit={handleEdit}
                onDelete={(id) => setDeleteConfirm(id)}
              />
            ))}
          </div>
        )}
      </main>

      {/* Add/Edit Modal */}
      {showModal && (
        <AddItemModal
          onClose={handleModalClose}
          onSuccess={fetchItems}
          editItem={editItem}
        />
      )}

      {/* Delete Confirm Modal */}
      {deleteConfirm && (
        <div className="modal-overlay" onClick={() => setDeleteConfirm(null)}>
          <div className="confirm-box fade-in" onClick={(e) => e.stopPropagation()}>
            <div className="confirm-icon">🗑️</div>
            <h3>Delete Item?</h3>
            <p>This action cannot be undone.</p>
            <div className="confirm-actions">
              <button className="btn btn-outline" onClick={() => setDeleteConfirm(null)}>Cancel</button>
              <button className="btn btn-danger" onClick={() => handleDelete(deleteConfirm)}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const getGreeting = () => {
  const h = new Date().getHours();
  if (h < 12) return 'Morning';
  if (h < 17) return 'Afternoon';
  return 'Evening';
};

export default Dashboard;
