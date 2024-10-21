import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'; 
import './Login.css';  // Import file CSS

const Login = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      navigate('/'); // Quay lại trang chủ sau khi đăng nhập
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <form onSubmit={handleLogin} className="login-form">
  <h1>Login</h1>
  <input
    type="email"
    placeholder="Email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    required
  />
  <div className="password-container">
    <input
      type={showPassword ? 'text' : 'password'}
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
    />
    <span className="password-toggle" onClick={togglePasswordVisibility}>
      <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
    </span>
  </div>
  <button type="submit">Đăng Nhập</button>
</form>

  );
};

export default Login;
