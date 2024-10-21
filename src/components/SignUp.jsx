import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { auth } from '../firebase'; // Import firebase auth
import { createUserWithEmailAndPassword } from 'firebase/auth'; // Import hàm tạo người dùng
import './SignUp.css'; 

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); // Khởi tạo navigate

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Mật khẩu không khớp!');
      return;
    }
    try {
      // Tạo tài khoản mới
      await createUserWithEmailAndPassword(auth, email, password);
      alert(`Chào mừng, ${username}! Đăng ký thành công.`);
      navigate('/login'); // Chuyển đến trang đăng nhập
    } catch (error) {
      // Kiểm tra lỗi cụ thể
      if (error.code === 'auth/email-already-in-use') {
        alert('Email này đã được sử dụng.');
      } else {
        alert(error.message);
      }
    }
  };

  return (
    <div className="signup-container">
      <h2>Đăng Ký</h2>
      <form onSubmit={handleSignUp}>
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Tên người dùng"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="input-wrapper">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="input-wrapper">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <FontAwesomeIcon
            icon={showPassword ? faEyeSlash : faEye}
            className="eye-icon"
            onClick={togglePasswordVisibility}
          />
        </div>

        <div className="input-wrapper">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Xác nhận mật khẩu"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <FontAwesomeIcon
            icon={showPassword ? faEyeSlash : faEye}
            className="eye-icon"
            onClick={togglePasswordVisibility}
          />
        </div>

        <button type="submit">Đăng Ký</button>
      </form>
    </div>
  );
};

export default SignUp;
