import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const History = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await api.get('/analyze/history');
        setMessages(res.data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchHistory();
  }, []);

  return (
    <div style={{ padding: '24px', maxWidth: '600px', margin: '0 auto' }} className="fade-in">
      <h2 style={{ fontSize: '2rem', color: 'var(--primary)', marginBottom: '24px' }}>Analysis History</h2>
      {messages.length === 0 ? (
        <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No history available.</p>
      ) : (
        messages.map((item) => (
          <div key={item._id} className="card" style={{ borderLeft: `4px solid ${item.riskLevel === 'Danger' ? 'var(--danger)' : item.riskLevel === 'Be Careful' ? 'var(--careful)' : 'var(--safe)'}` }}>
            <p style={{ fontStyle: 'italic', marginBottom: '8px' }}>"{item.originalText}"</p>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{new Date(item.createdAt).toLocaleDateString()}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default History;
