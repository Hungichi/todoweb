import React, { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { BiPencil } from 'react-icons/bi'; // Icon bút

const Card = ({ card, index, onEditCard, onDeleteCard, moveCard, listId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState(card.title);
  const [newDeadline, setNewDeadline] = useState(card.deadline || "");
  const [image, setImage] = useState(card.image || null); // Lưu ảnh của thẻ
  const [isHovered, setIsHovered] = useState(false); // Trạng thái để quản lý việc hiển thị icon

  // Kéo thả thẻ
  const [{ isDragging }, drag] = useDrag({
    type: 'CARD',
    item: { id: card.id, index, listId },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ isOver }, drop] = useDrop({
    accept: 'CARD',
    hover: (item) => {
      if (item.index !== index) {
        moveCard(item.listId, item.index, listId, index);
        item.index = index;
        item.listId = listId;
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const handleEditSubmit = (e) => {
    e.preventDefault();
    // Cập nhật cả title, deadline và image
    onEditCard(card.id, newTitle, newDeadline, image); 
    setIsModalOpen(false); // Đóng modal sau khi submit
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Lưu hình ảnh dưới dạng base64
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      ref={(node) => drag(drop(node))}
      className="card"
      style={{
        opacity: isDragging ? 0.5 : 1,
        position: 'relative',
      }}
      onMouseEnter={() => setIsHovered(true)} // Hiện icon khi di chuột vào
      onMouseLeave={() => setIsHovered(false)} // Ẩn icon khi không còn di chuột
    >
      {image && <img src={image} alt="Uploaded" className="card-image" />} {/* Hiện hình ảnh nếu có */}

      <span>{card.title}</span>
      {card.deadline && <p className="card-deadline">Deadline: {card.deadline}</p>}

      {/* Hiện biểu tượng bút chì chỉ khi isHovered là true */}
      {isHovered && (
        <div className={`edit-icon-container`}>
          <BiPencil 
            className="edit-icon" 
            onClick={() => setIsModalOpen(true)} // Mở modal khi nhấn vào bút
          />
        </div>
      )}

      {/* Modal chỉnh sửa */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Edit Card</h2>
            <form onSubmit={handleEditSubmit}>
              <label>
                Title:
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  required
                  autoFocus
                />
              </label>

              <label>
                Deadline:
                <input
                  type="date"
                  value={newDeadline}
                  onChange={(e) => setNewDeadline(e.target.value)}
                />
              </label>

              <label>
                Image:
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>

              <div className="modal-actions">
                <button className="btn save-btn" type="submit">
                  Save
                </button>
                <button
                  className="btn cancel-btn"
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="btn delete-btn"
                  type="button"
                  onClick={() => {
                    onDeleteCard(card.id);
                    setIsModalOpen(false);
                  }}
                >
                  Delete
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
