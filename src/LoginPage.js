import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './App.css'

function LoginPage() {
  const [username, setUsername] = useState('');
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://assignment.stage.crafto.app/login', {
        username,
        otp: '1234', 
      });
      
      localStorage.setItem('token', response.data.token);
      navigate('/quotes');
    } catch (error) {
      alert('Login failed');
    }
  };

  return (
    <div className="login-page">
      <h2 className='login-page-heading'>Login</h2>
      <form className='login-form' onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
