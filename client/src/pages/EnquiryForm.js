// src/pages/EnquiryForm.js
import React, { useState } from 'react';
import './EnquiryForm.css';
import axios from 'axios';

function EnquiryForm() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const user = JSON.parse(localStorage.getItem('vinsysClient') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('vinsysClient');
    window.location.href = '/';
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await axios.post(`${process.env.REACT_APP_API_URL}/api/enquiry`, form);
    setSubmitted(true);
    setForm({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      message: ''
    });
    setTimeout(() => setSubmitted(false), 3000);
  } catch (error) {
    alert('❌ Failed to submit enquiry. Please try again.');
    console.error(error);
  }
};


  const faqs = [
    {
      question: 'What courses does VINSYS offer?',
      answer: 'We offer IT certifications, project management, cybersecurity, DevOps, cloud computing, and language training.'
    },
    {
      question: 'Are the trainings online or offline?',
      answer: 'We offer both online instructor-led and in-person classroom training depending on your preference.'
    },
    {
      question: 'Do you provide certification?',
      answer: 'Yes, after course completion, we provide industry-recognized certificates.'
    },
    {
      question: 'What is the refund policy?',
      answer: 'You can get a full refund within 7 days before the course starts.'
    }
  ];

  return (
    <div className="enquiry-page">
      <div className="top-bar">
        <div className="top-right">
          <span className="welcome-user">Welcome, {user.name || 'User'}</span>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </div>

      <div className="enquiry-banner">
        <div>
          <h1>Enquiry</h1>
          <p>Have a question about our training programs? Let’s talk.</p>
        </div>
      </div>

      <div className="enquiry-content">
        <div className="faq-section">
          <h2>📚 Frequently Asked Questions</h2>
          {faqs.map((faq, index) => (
            <div className="faq-item" key={index}>
              <h4>{faq.question}</h4>
              <p>{faq.answer}</p>
            </div>
          ))}

          <div className="form-trigger">
            <p>Didn’t find your question here?</p>
            <button className="trigger-btn" onClick={() => setShowForm(true)}>Submit a New Enquiry</button>
          </div>
        </div>

        {showForm && (
          <div className="form-section">
            <h2>✉️ Submit a New Enquiry</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={form.firstName}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={form.lastName}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={form.phone}
                onChange={handleChange}
                required
              />
              <textarea
                name="message"
                placeholder="Write your query..."
                value={form.message}
                onChange={handleChange}
                required
              />
              <button className="submit-btn" type="submit">Send Enquiry</button>
              {submitted && <p className="success-message">✅ Enquiry submitted successfully!</p>}
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default EnquiryForm;
