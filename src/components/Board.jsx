import React, { useState, useEffect } from 'react';
import List from './List';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import AddList from './AddList';
import { useLocation, useNavigate } from 'react-router-dom';

const Board = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state?.background || '/images/backgrounds/bg1.jpg';

  // Load boards từ localStorage
  const loadBoards = () => {
    return JSON.parse(localStorage.getItem('boards')) || [];
  };

  const [boards, setBoards] = useState(loadBoards);
  const [currentBoard, setCurrentBoard] = useState(
    JSON.parse(localStorage.getItem('currentBoard')) || location.state?.board
  );

  // Đồng bộ `boards` và `currentBoard` với localStorage khi `currentBoard` thay đổi
  useEffect(() => {
    const updatedBoards = boards.map((board) =>
      board.id === currentBoard.id ? currentBoard : board
    );

    setBoards(updatedBoards);
    localStorage.setItem('boards', JSON.stringify(updatedBoards));
    localStorage.setItem('currentBoard', JSON.stringify(currentBoard));
  }, [currentBoard]);

  // Thêm card vào list
  const addCardToList = (listId, newCard) => {
    setCurrentBoard((prevBoard) => {
      const updatedLists = prevBoard.lists.map((list) =>
        list.id === listId ? { ...list, cards: [...list.cards, newCard] } : list
      );
      return { ...prevBoard, lists: updatedLists };
    });
  };

  // Chỉnh sửa card
  const editCard = (cardId, newTitle, newDeadline, image) => {
    setCurrentBoard((prevBoard) => {
      const updatedLists = prevBoard.lists.map((list) => {
        const updatedCards = list.cards.map((card) =>
          card.id === cardId ? { ...card, title: newTitle, deadline: newDeadline } : card
        );
        return { ...list, cards: updatedCards };
      });
      return { ...prevBoard, lists: updatedLists };
    });
  };

  // Xóa card
  const deleteCard = (cardId) => {
    setCurrentBoard((prevBoard) => {
      const updatedLists = prevBoard.lists.map((list) => {
        const updatedCards = list.cards.filter((card) => card.id !== cardId);
        return { ...list, cards: updatedCards };
      });
      return { ...prevBoard, lists: updatedLists };
    });
  };

  // Di chuyển card giữa các list
  const moveCard = (fromListId, fromIndex, toListId, toIndex) => {
    setCurrentBoard((prevBoard) => {
      const fromList = prevBoard.lists.find((list) => list.id === fromListId);
      const toList = prevBoard.lists.find((list) => list.id === toListId);
      const updatedFromCards = [...fromList.cards];
      const updatedToCards = [...toList.cards];

      const [movedCard] = updatedFromCards.splice(fromIndex, 1);
      updatedToCards.splice(toIndex, 0, movedCard);

      const updatedLists = prevBoard.lists.map((list) => {
        if (list.id === fromListId) {
          return { ...list, cards: updatedFromCards };
        } else if (list.id === toListId) {
          return { ...list, cards: updatedToCards };
        }
        return list;
      });

      return { ...prevBoard, lists: updatedLists };
    });
  };

  // Thêm list mới
  const addList = (newList) => {
    setCurrentBoard((prevBoard) => ({
      ...prevBoard,
      lists: [...prevBoard.lists, newList],
    }));
  };

  // Chỉnh sửa tiêu đề của list
  const editListTitle = (listId, newTitle) => {
    setCurrentBoard((prevBoard) => {
      const updatedLists = prevBoard.lists.map((list) =>
        list.id === listId ? { ...list, title: newTitle } : list
      );
      return { ...prevBoard, lists: updatedLists };
    });
  };

  // Xóa list
  const deleteList = (listId) => {
    setCurrentBoard((prevBoard) => {
      const updatedLists = prevBoard.lists.filter((list) => list.id !== listId);
      const newBoard = { ...prevBoard, lists: updatedLists };
      localStorage.setItem('currentBoard', JSON.stringify(newBoard));
      return newBoard;
    });
  };

  // Hàm xóa board
  const handleDeleteBoard = () => {
    if (window.confirm('Bạn có chắc chắn muốn xóa board này?')) {
      const updatedBoards = boards.filter(board => board.id !== currentBoard.id);
      localStorage.setItem('boards', JSON.stringify(updatedBoards));
      localStorage.removeItem('currentBoard');
      navigate('/boards'); // Quay về BoardsPage
    }
  };

 return (
  <DndProvider backend={HTML5Backend}>
    <div
      className="board"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        minWidth: '100vw',
        overflow: 'hidden',
      }}
    >
      {/* Thẻ chứa lớn với background */}
      <div className="board-container" style={{ position: 'relative', paddingTop: '60px' }}>
        {/* Thanh thông tin board */}
        <div className="board-info-bar">
          <h2>{currentBoard.title}</h2>
          <button className="delete-board-btn" onClick={handleDeleteBoard}>
            Xóa Board
          </button>
        </div>

        {/* Container để render danh sách */}
        <div className="list-container">
          {currentBoard.lists.map((list) => (
            <List
              key={list.id}
              list={list}
              onAddCard={addCardToList}
              onEditCard={editCard}
              onDeleteCard={deleteCard}
              moveCard={moveCard}
              onEditListTitle={editListTitle}
              onDeleteList={deleteList}
            />
          ))}
          <AddList onAddList={addList} />
        </div>
      </div>
    </div>
  </DndProvider>
);

  
};

export default Board;
