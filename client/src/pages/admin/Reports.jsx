import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const Reports = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    const res = await api.get('/reports');
    setReports(res.data);
  };

  const handleUpdate = async (id, status) => {
    await api.put(`/reports/${id}/status`, { status });
    fetchReports();
  };

  return (
    <div>
      <h2>User Scam Reports</h2>
      <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {reports.map(r => (
          <div key={r._id} className="card" style={{ borderLeft: `4px solid ${r.status === 'Pending' ? 'orange' : r.status === 'Reviewed' ? 'blue' : 'red'}` }}>
            <p><strong>Message:</strong> {r.message}</p>
            <p><strong>Status:</strong> {r.status}</p>
            <p><strong>User:</strong> {r.user ? r.user.name : 'Unknown'}</p>
            <div style={{ marginTop: '12px', display: 'flex', gap: '8px' }}>
              <button className="btn btn-outline" onClick={() => handleUpdate(r._id, 'Reviewed')}>Mark Reviewed</button>
              <button className="btn btn-outline" style={{ borderColor: 'red', color: 'red' }} onClick={() => handleUpdate(r._id, 'Confirmed Scam')}>Confirm Scam</button>
            </div>
          </div>
        ))}
        {reports.length === 0 && <p>No reports found.</p>}
      </div>
    </div>
  );
};

export default Reports;
