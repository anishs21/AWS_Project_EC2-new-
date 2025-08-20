import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../pages/Home.css';

import bg1 from '../static/bg1.jpg';
import bg2 from '../static/bg2.avif';
import banner2 from '../static/banner2.jpg';
import logo from '../static/vinsys-logo.png';

import service1 from '../static/service1.webp';
import service2 from '../static/service2.jpg';
import service3 from '../static/service3.jpg';

const Home = () => {
  const [bgIndex, setBgIndex] = useState(0);
  const bgImages = [bg1, banner2, bg2];
  const navigate = useNavigate();


  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prevIndex) => (prevIndex + 1) % bgImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleExploreClick = () => {
    const user = localStorage.getItem("user"); // or your auth check
    if (user) {
      navigate("/enquiry-form");
    } else {
      navigate("/login");
    }
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-brand">
          <img src={logo} alt="Vinsys Logo" className="logo-img" />
          <span className="brand-text">Vinsys</span>
        </div>
        <div className="navbar-links">
          <a href="/login">Login</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        className="hero-section"
        style={{ backgroundImage: `url(${bgImages[bgIndex]})` }}
      >
        <div className="hero-box">
          <h1>Master In-Demand IT Skills with Vinsys</h1>
          <p>Get certified in Project Management, DevOps, Cybersecurity, Cloud Computing, and more.</p>
          <p className="highlight">🚀 Seamlessly manage your client enquiries with our powerful Enquiry Management System.</p>
          <button onClick={handleExploreClick} className="btn">Explore Trainings</button>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <h2>Popular IT Training Programs</h2>
        <div className="services-grid">
          <div className="service-card">
            <img src={service1} alt="Cloud Training" />
            <div className="info">
              <h3>Cloud Computing (AWS/Azure)</h3>
              <p>Learn cloud architecture, services, and deployment on AWS, Azure, and GCP.</p>
              <button onClick={handleExploreClick} className="btn">Explore Trainings</button>
            </div>
          </div>

          <div className="service-card">
            <img src={service2} alt="DevOps" />
            <div className="info">
              <h3>DevOps & Automation</h3>
              <p>Master CI/CD pipelines, Docker, Jenkins, Kubernetes, and automation tools.</p>
              <button onClick={handleExploreClick} className="btn">Explore Trainings</button>
            </div>
          </div>

          <div className="service-card">
            <img src={service3} alt="Cybersecurity" />
            <div className="info">
              <h3>Cybersecurity & Ethical Hacking</h3>
              <p>Protect infrastructure with certified training in ethical hacking and security.</p>
              <button onClick={handleExploreClick} className="btn">Explore Trainings</button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2>VINSYS Client Enquiry System – Key Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="icon">📝</div>
            <h3>Enquiry Form</h3>
            <p>Collect client details like name, email, and queries through a smart, user-friendly form.</p>
          </div>
          <div className="feature-card">
            <div className="icon">📋</div>
            <h3>Enquiry List</h3>
            <p>View and manage all enquiries in one place with search and sorting options.</p>
          </div>
          <div className="feature-card">
            <div className="icon">📊</div>
            <h3>Admin Dashboard</h3>
            <p>Filter, sort, and analyze enquiries by date, status, or user assignment.</p>
          </div>
          <div className="feature-card">
            <div className="icon">🔐</div>
            <h3>User Authentication</h3>
            <p>Secure login system using email and password for authorized access.</p>
          </div>
          <div className="feature-card">
            <div className="icon">🧾</div>
            <h3>PDF Export</h3>
            <p>Easily export enquiries as PDFs for offline access, reporting, or printing.</p>
          </div>
          <div className="feature-card">
            <div className="icon">⏱️</div>
            <h3>Real-time Status</h3>
            <p>Track live updates on enquiry progress with real-time status notifications.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-grid">
          <div>
            <h4>Vinsys</h4>
            <p>Empowering enterprises through smart client engagement solutions.</p>
            <p className="highlight">Training & Certifications | IT Services | Digital Learning</p>
          </div>

          <div>
            <h5>Quick Links</h5>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/dashboard">Dashboard</a></li>
              <li><a href="/enquiry-form">Enquire</a></li>
              <li><a href="/login">Login</a></li>
            </ul>
          </div>

          <div>
            <h5>Contact</h5>
            <p>Email: <a href="mailto:support@vinsys.com">support@vinsys.com</a></p>
            <p>Phone: +91 12345 67890</p>
          </div>
        </div>
        <div className="footer-bottom">
          © 2025 <span className="highlight">Vinsys</span>. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Home;
