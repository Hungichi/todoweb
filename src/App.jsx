import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import BoardsPage from './components/BoardsPage';
import Board from './components/Board';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Footer from './components/footer';  

function AppContent() {
  const location = useLocation();  // Lấy thông tin đường dẫn hiện tại
  const showFooter = !location.pathname.startsWith('/board');  // Ẩn footer nếu URL bắt đầu bằng "/board"

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<BoardsPage />} />  {/* Trang chính */}
        <Route path="/board/:id" element={<Board />} />  {/* Trang board với id thay đổi */}
        <Route path="/signup" element={<SignUp />} />  {/* Đăng ký */}
        <Route path="/login" element={<Login />} />  {/* Đăng nhập */}
      </Routes>
      {showFooter && <Footer />}  {/* Footer ẩn khi ở trang Board */}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />  {/* AppContent chứa toàn bộ logic bên trong Router */}
    </Router>
  );
}

export default App;
