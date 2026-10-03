import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { Trash2 } from 'lucide-react';

const Saved = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchSaved();
  }, []);

  const fetchSaved = async () => {
    try {
      const res = await api.get('/saved');
      setMessages(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/saved/${id}`);
      fetchSaved();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div style={{ padding: '24px', maxWidth: '600px', margin: '0 auto' }} className="fade-in">
      <h2 style={{ fontSize: '2rem', color: 'var(--primary)', marginBottom: '24px' }}>Saved Messages</h2>
      {messages.length === 0 ? (
        <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No saved messages.</p>
      ) : (
        messages.map((item) => (
          <div key={item._id} className="card" style={{ position: 'relative' }}>
            <p style={{ fontStyle: 'italic', marginBottom: '8px' }}>"{item.message.originalText}"</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ 
                padding: '4px 8px', borderRadius: '4px', fontSize: '0.9rem',
                background: item.message.riskLevel === 'Danger' ? '#fee2e2' : item.message.riskLevel === 'Be Careful' ? '#fef3c7' : '#dcfce7',
                color: item.message.riskLevel === 'Danger' ? '#991b1b' : item.message.riskLevel === 'Be Careful' ? '#92400e' : '#166534'
              }}>
                {item.message.riskLevel}
              </span>
              <button onClick={() => handleDelete(item._id)} style={{ background: 'none', border: 'none', color: 'var(--danger)', cursor: 'pointer' }}>
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Saved;
