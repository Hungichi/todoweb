// src/components/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.signOut();
    setUser(null); // Xóa trạng thái user sau khi đăng xuất
    navigate('/'); // Quay lại trang chủ sau khi đăng xuất
  };

  const userName = user ? user.email.split('@')[0] : ''; // Lấy tên trước '@'

  return (
    <nav style={{ backgroundColor: '#4a90e2', padding: '10px 20px', color: 'white', display: 'flex', justifyContent: 'space-between' }}>
      <h1>To Do App</h1>
      
      <div style={{display:"flex"}}>
      <Link to="/" style={{  color: 'white', textDecoration: 'none' }}>Home</Link>
        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span>{userName}</span>
            <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
          </div>
        ) : (
          <>
            
            <Link to="/login" style={{ margin: '0 10px', color: 'white', textDecoration: 'none' }}>Login</Link>
            <Link to="/signup" style={{ color: 'white', textDecoration: 'none' }}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
