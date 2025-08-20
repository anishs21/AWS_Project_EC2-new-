import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminDashboard.css';
import { useNavigate } from 'react-router-dom';
import { exportEnquiriesToS3 } from '../components/exportToS3'; // ✅ Import function

function AdminDashboard() {
  const [admin, setAdmin] = useState(null);
  const [enquiries, setEnquiries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedAdmin = JSON.parse(localStorage.getItem('vinsysAdmin'));
    if (storedAdmin) {
      setAdmin(storedAdmin);
    } else {
      navigate('/');
    }

    const fetchData = async () => {
  try {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/enquiries`);
    setEnquiries(res.data);
  } catch (err) {
    alert('Failed to fetch enquiries');
    console.error(err);
  } finally {
    setLoading(false);
  }
};


    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('vinsysAdmin');
    navigate('/');
  };

  const filteredEnquiries = enquiries.filter(e =>
    (e.firstName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (e.lastName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (e.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (e.phone || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (e.message || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ✅ Upload filtered PDF to S3
  const handleExportToS3 = async () => {
    const result = await exportEnquiriesToS3(
      filteredEnquiries.map((e, i) => ({
        name: `${e.firstName} ${e.lastName}`,
        email: e.email,
        phone: e.phone,
        query: e.message,
      }))
    );

    if (result.success) {
      alert(`✅ PDF uploaded as ${result.fileName}`);
    } else {
      alert('❌ Failed to upload PDF');
    }
  };

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-header">
        <h1>📊 VINSYS Admin Dashboard</h1>
        <div className="dashboard-header-right">
          {admin && <span className="welcome-text">Welcome, {admin.name}</span>}
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="dashboard-controls">
          <input
            type="text"
            placeholder="🔍 Search enquiries..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="export-btn" onClick={handleExportToS3}>📤 Export PDF to S3</button>
        </div>

        <div className="dashboard-summary">
          <span>📌 Total Enquiries: {filteredEnquiries.length}</span>
        </div>

        <div className="table-container">
          {loading ? (
            <div className="loader">Loading enquiries...</div>
          ) : (
            <table className="enquiry-table">
              <thead>
                <tr>
                  <th>Sr No.</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Message</th>
                  <th>Created At</th>
                </tr>
              </thead>
              <tbody>
                {filteredEnquiries.length > 0 ? (
                  filteredEnquiries.map((e, i) => (
                    <tr key={e.id || i}>
                      <td>{i + 1}</td>
                      <td>{e.firstName}</td>
                      <td>{e.lastName}</td>
                      <td>{e.email}</td>
                      <td>{e.phone}</td>
                      <td>{e.message}</td>
                      <td>{new Date(e.createdAt).toLocaleString()}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="no-data">No enquiries found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
