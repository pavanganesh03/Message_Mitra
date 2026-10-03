import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const ScamPatterns = () => {
  const [patterns, setPatterns] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [riskLevel, setRiskLevel] = useState('Danger');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetchPatterns();
  }, []);

  const fetchPatterns = async () => {
    const res = await api.get('/admin/scam-patterns');
    setPatterns(res.data);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    await api.post('/admin/scam-patterns', { keyword, riskLevel, description });
    setKeyword('');
    setDescription('');
    fetchPatterns();
  };

  const handleDelete = async (id) => {
    if(window.confirm('Delete pattern?')) {
      await api.delete(`/admin/scam-patterns/${id}`);
      fetchPatterns();
    }
  };

  return (
    <div>
      <h2>Scam Patterns (Regex / Keywords)</h2>
      
      <form onSubmit={handleAdd} className="card" style={{ marginTop: '20px', display: 'grid', gap: '16px', gridTemplateColumns: '1fr 1fr 2fr auto' }}>
        <input className="input-field" placeholder="Keyword (Regex)" value={keyword} onChange={e => setKeyword(e.target.value)} required />
        <select className="input-field" value={riskLevel} onChange={e => setRiskLevel(e.target.value)}>
          <option value="Danger">Danger</option>
          <option value="Be Careful">Be Careful</option>
        </select>
        <input className="input-field" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} required />
        <button type="submit" className="btn btn-primary">Add</button>
      </form>

      <div style={{ marginTop: '20px' }}>
        {patterns.map(p => (
          <div key={p._id} className="card" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <h4>{p.keyword} <span style={{ fontSize: '0.8rem', color: p.riskLevel === 'Danger' ? 'red' : 'orange' }}>[{p.riskLevel}]</span></h4>
              <p>{p.description}</p>
            </div>
            <button onClick={() => handleDelete(p._id)} style={{ color: 'red', cursor: 'pointer', border: 'none', background: 'none' }}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScamPatterns;
