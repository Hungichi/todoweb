// src/components/AddCard.jsx
import React, { useState } from 'react';

const AddCard = ({ onAddCard }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [cardTitle, setCardTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!cardTitle) return;

    const newCard = {
      id: `card-${Date.now()}`,
      title: cardTitle,
    };

    onAddCard(newCard);
    setCardTitle('');
    setIsAdding(false); // Ẩn input sau khi thêm thẻ
  };

  return (
    <div className="add-card-container">
      {isAdding ? (
        <form onSubmit={handleSubmit} className="add-card-form">
          <input
            type="text"
            className="card-input"
            placeholder="Enter card title..."
            value={cardTitle}
            onChange={(e) => setCardTitle(e.target.value)}
            required
            autoFocus
          />
          <div className="btn-group">
            <button type="submit" className="btn add-btn">
              Add
            </button>
            <button
              type="button"
              className="btn cancel-btn"
              onClick={() => setIsAdding(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <p
          className="add-new-card"
          onClick={() => setIsAdding(true)}
        >
          + Add new card
        </p>
      )}
    </div>
  );
};

export default AddCard;
