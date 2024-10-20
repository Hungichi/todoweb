import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const backgroundImages = [
  '/images/backgrounds/bg1.jpg',
  '/images/backgrounds/bg2.jpg',
  '/images/backgrounds/bg3.jpg',
  '/images/backgrounds/bg4.jpg',
  '/images/backgrounds/bg5.jpg',
];

const BoardsPage = () => {
  const navigate = useNavigate();

  const loadBoards = () => {
    try {
      const savedBoards = JSON.parse(localStorage.getItem('boards'));
      return Array.isArray(savedBoards) ? savedBoards : [];
    } catch (error) {
      console.error('Error loading boards from Local Storage:', error);
      return [];
    }
  };

  const [boards, setBoards] = useState(loadBoards);
  const [isCreating, setIsCreating] = useState(false);
  const [newBoardTitle, setNewBoardTitle] = useState('');
  const [newBackground, setNewBackground] = useState(backgroundImages[0]);

  useEffect(() => {
    localStorage.setItem('boards', JSON.stringify(boards));
  }, [boards]);

  const handleAddBoard = () => {
    if (newBoardTitle.trim()) {
      const newBoard = {
        id: `board-${Date.now()}`,
        title: newBoardTitle,
        background: newBackground,
        lists: [
          { id: 'list-1', title: 'To Do', cards: [] },
          { id: 'list-2', title: 'In Progress', cards: [] },
          { id: 'list-3', title: 'Done', cards: [] },
        ],
      };
      setBoards((prevBoards) => [...prevBoards, newBoard]);
      resetForm();
    }
  };

  const resetForm = () => {
    setNewBoardTitle('');
    setNewBackground(backgroundImages[0]);
    setIsCreating(false);
  };

  const handleBoardClick = (board) => {
    localStorage.setItem('currentBoard', JSON.stringify(board));
    navigate(`/board/${board.id}`, { state: { board } });
  };

  return (
    <div className="boards-page">
      <h1>Your Workspaces</h1>
      <button className="create-board-btn" onClick={() => setIsCreating(true)}>
        + Create New Board
      </button>

      {isCreating && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <h2>Create a New Board</h2>
            <input
              type="text"
              placeholder="Enter board title"
              value={newBoardTitle}
              onChange={(e) => setNewBoardTitle(e.target.value)}
              className="new-board-input"
            />
            <div className="background-selection">
              <h3>Select Background</h3>
              <div className="background-options">
                {backgroundImages.map((image, index) => (
                  <div
                    key={index}
                    className={`background-option ${
                      newBackground === image ? 'selected' : ''
                    }`}
                    style={{
                      backgroundImage: `url(${image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                    onClick={() => setNewBackground(image)}
                  />
                ))}
              </div>
            </div>
            <div className="modal-actions">
              <button className="create-btn" onClick={handleAddBoard}>
                Create
              </button>
              <button className="cancel-btn" onClick={resetForm}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="boards-list">
        {boards.map((board) => (
          <div
            key={board.id}
            className="board-link"
            style={{
              backgroundImage: `url(${board.background})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              cursor: 'pointer',
            }}
            onClick={() => handleBoardClick(board)}
          >
            <div className="board-item">
              <h2>{board.title}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BoardsPage;
