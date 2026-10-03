import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    api.get('/admin/messages').then(res => setMessages(res.data)).catch(console.error);
  }, []);

  const filtered = filter === 'All' ? messages : messages.filter(m => m.riskLevel === filter);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>All Analyzed Messages</h2>
        <select className="input-field" style={{ width: '200px' }} value={filter} onChange={e => setFilter(e.target.value)}>
          <option value="All">All Levels</option>
          <option value="Safe">Safe</option>
          <option value="Be Careful">Be Careful</option>
          <option value="Danger">Danger</option>
        </select>
      </div>

      <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {filtered.map(m => (
          <div key={m._id} className="card" style={{ borderLeft: `6px solid ${m.riskLevel === 'Danger' ? 'red' : m.riskLevel === 'Be Careful' ? 'orange' : 'green'}` }}>
            <p><strong>Text:</strong> {m.originalText}</p>
            <p><strong>Category:</strong> {m.category} | <strong>Risk:</strong> {m.riskLevel}</p>
            <p><strong>User:</strong> {m.user ? `${m.user.name} (${m.user.phone})` : 'Guest'}</p>
            <p style={{ fontSize: '0.8rem', color: 'gray' }}>{new Date(m.createdAt).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Messages;
