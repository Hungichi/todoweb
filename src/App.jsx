// App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import BoardsPage from './components/BoardsPage';
import Board from './components/Board';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Footer from './components/footer';  
import { auth } from './firebase'; 

function AppContent({ user, setUser }) {
  const location = useLocation();
  const showFooter = !location.pathname.startsWith('/board');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser); // Cập nhật trạng thái người dùng
    });

    return () => unsubscribe(); // Hủy đăng ký listener khi component unmount
  }, [setUser]);

  return (
    <div className="App">
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<BoardsPage />} />
        <Route path="/board/:id" element={<Board />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
      </Routes>
      {showFooter && <Footer />}
    </div>
  );
}

function App() {
  const [user, setUser] = useState(null); // Quản lý trạng thái người dùng

  return (
    <Router>
      <AppContent user={user} setUser={setUser} />
    </Router>
  );
}

export default App;
