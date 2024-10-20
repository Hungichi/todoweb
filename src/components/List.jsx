import React, { useState } from 'react';
import Card from './Card';
import AddCard from './AddCard';
import { useDrop } from 'react-dnd';
import { BiTrash } from 'react-icons/bi'; // Import biểu tượng thùng rác

const List = ({ 
  list, 
  onAddCard, 
  onEditCard, 
  onDeleteCard, 
  moveCard, 
  onEditListTitle, 
  onDeleteList 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(list.title);

  const handleEditTitle = () => {
    setIsEditing(false);
    onEditListTitle(list.id, newTitle);
  };

  const handleDeleteList = () => {
    if (window.confirm(`Are you sure you want to delete the list "${list.title}"?`)) {
      onDeleteList(list.id); 
    }
  };

  const handleAddCard = (newCard) => {
    onAddCard(list.id, newCard);
  };

  const [{ isOver }, drop] = useDrop({
    accept: 'CARD',
    drop: (item) => {
      moveCard(item.listId, item.index, list.id, 0);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div 
      ref={drop} 
      className="list" 
      style={{ backgroundColor: isOver ? '#f0f0f0' : 'white' }}
    >
      <div className="list-header">
        {isEditing ? (
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onBlur={handleEditTitle}
            onKeyDown={(e) => e.key === 'Enter' && handleEditTitle()}
            autoFocus
          />
        ) : (
          <h3 className="list-title" onClick={() => setIsEditing(true)}>
            {list.title}
          </h3>
        )}

        <BiTrash 
          className="delete-list-icon" 
          onClick={handleDeleteList} 
        />
      </div>

      <div className="list-cards">
        {list.cards.map((card, index) => (
          <Card
            key={card.id}
            card={card}
            index={index}
            onEditCard={onEditCard}
            onDeleteCard={onDeleteCard}
            moveCard={moveCard}
            listId={list.id}
          />
        ))}
      </div>

      <AddCard onAddCard={handleAddCard} />
    </div>
  );
};

export default List;

