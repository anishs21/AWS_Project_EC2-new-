// src/pages/RegisterPage.js
import React, { useState } from 'react';
import axios from 'axios';
import './RegisterPage.css';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [form, setForm] = useState({
    role: 'client',
    name: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/user/register`, form);
      alert('Registration successful!');
      navigate('/');
    } catch (error) {
      console.error(error);
      setErrorMsg('Registration failed. Try again.');
    } finally {
      setLoading(false);
    }
  }; 

  return (
    <div className="register-page">
      <nav className="navbar">
        <div className="navbar-left">Vinsys</div>
        <div className="navbar-right">
          <button className="home-button" onClick={() => navigate('/')}>
            Home
          </button>
        </div>
      </nav>

      <div className="register-wrapper">
        <div className="register-card">
          <h2>Register</h2>
          <form onSubmit={handleSubmit}>
            <label>User Type</label>
            <select name="role" value={form.role} onChange={handleChange}>
              <option value="client">client</option>
              <option value="admin">admin</option>
            </select>

            <label>Full Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Enter your name"
            />

            <label>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />

            <label>Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              placeholder="Create a password"
            />

            <button type="submit" disabled={loading}>
              {loading ? 'Registering...' : 'Register'}
            </button>

            {errorMsg && <p className="error">{errorMsg}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
