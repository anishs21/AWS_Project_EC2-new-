import React, { useState } from 'react';
import axios from 'axios';
import './AdminLogin.css';
import { useNavigate, Link } from 'react-router-dom';

const AdminLogin = ({ onSwitch }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const response = await axios.post(
  `${process.env.REACT_APP_API_URL}/api/admin/login`,
  {
    email,
    password,
  }
);

      const userData = response.data;
      console.log("userData: ", userData);
      if (userData.role !== 'admin') {
        setErrorMsg('Invalid email or password');
        setLoading(false);
        return;
      }

      localStorage.setItem('vinsysAdmin', JSON.stringify(userData));
      alert('Login successful!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      setErrorMsg('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      {/* Navbar */}
      <nav className="navbar">
    <div className="navbar-left" onClick={() => navigate('/')}>
      Vinsys
    </div>
  <div className="navbar-right">
    <button className="switch-button" onClick={onSwitch}>
      Client Login
    </button>
  </div>
</nav>

      <div className="login-wrapper">
        <button className="switch-button" onClick={onSwitch}>
          Client Login
        </button>

        <div className="login-left">
          <img
            src="https://niitfoundation.org/wp-content/uploads/2021/06/Conducting-Deeply-Engaging-Online-Sessions.png"
            alt="Training Illustration"
            className="login-illustration"
          />
        </div>

        <div className="login-right">
          <div className="login-card">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="VINSYS"
              className="login-logo"
            />
            <h2>VINSYS Enquiry Manager</h2>
            <p>Please login to manage training enquiries.</p>

            <form onSubmit={handleLogin}>
              <label>Email</label>
              <input
                type="email"
                value={email}
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <label>Password</label>
              <input
                type="password"
                value={password}
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button type="submit" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>

            {errorMsg && <p style={{ color: 'red', marginTop: '10px' }}>{errorMsg}</p>}

            <div className="register-link">
              <p>
                Don’t have an account? <Link to="/register">Register</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
