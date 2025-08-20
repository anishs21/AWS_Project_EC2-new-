import React, { useState } from 'react';
import './ClientLogin.css';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const ClientLogin = ({ onSwitch }) => {
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
    `${process.env.REACT_APP_API_URL}/api/client/login`,
    {
      email,
      password,
    }
  )

      const userData = response.data;
      console.log("userData: ", userData);

      if (userData.role !== 'client') {
        setErrorMsg('Invalid email or password');
        setLoading(false);
        return;
      }

      localStorage.setItem('vinsysClient', JSON.stringify(userData));
      alert('Login successful!');
      navigate('/query');
    } catch (error) {
      console.error('Login failed:', error);
      setErrorMsg('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="client-login-page">
      {/* ✅ Navbar */}
      <nav className="navbar">
    <div className="navbar-left" onClick={() => navigate('/')}>
      Vinsys
    </div>
  <div className="navbar-right">
    <button className="switch-button" onClick={onSwitch}>
      Admin Login
    </button>
  </div>
</nav>

      <div className="client-login-wrapper">
        

        <div className="client-left">
          <img
            src="https://static.vecteezy.com/system/resources/previews/046/540/706/non_2x/data-protection-concept-shield-on-computer-data-management-and-protect-data-vector.jpg"
            alt="Client Illustration"
            className="client-illustration"
          />
        </div>

        <div className="client-right">
          <div className="client-card">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRilQYfWqyoZ-o5jtuBuHYJh2Dj43Gh0i5NUt3z8RO69cUw_eXgfSuTivmGl72Dn0gnehM&usqp=CAU"
              alt="Vinsys Client"
              className="client-logo"
            />
            <h2>Client Login</h2>
            <p>Access your training enquiry dashboard</p>

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

export default ClientLogin;
