import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';
import * as i18n from '../../i18n';
import api from '../../services/api';

const Home = () => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const lang = user?.preferredLanguage || 'en';
  const t = i18n[lang];

  const handleCheck = async () => {
    if (!message.trim()) return;
    setLoading(true);
    try {
      const res = await api.post('/analyze', { originalText: message, language: lang });
      navigate('/result', { state: { result: res.data } });
    } catch (err) {
      console.error(err);
      alert('Error analyzing message');
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '24px', maxWidth: '600px', margin: '0 auto' }} className="fade-in">
      <div style={{ textAlign: 'center', marginBottom: '32px', marginTop: '20px' }}>
        <ShieldCheck size={64} color="var(--primary)" style={{ margin: '0 auto' }} />
        <h2 style={{ fontSize: '2rem', color: 'var(--primary)', marginTop: '8px' }}>{t.app_name}</h2>
        <p style={{ color: 'var(--text-muted)' }}>{t.tagline}</p>
      </div>

      <div className="card">
        <textarea 
          className="input-field" 
          rows="6" 
          placeholder={t.paste_here}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ resize: 'none', fontSize: '1.2rem' }}
        ></textarea>
        
        <button 
          className="btn btn-primary" 
          style={{ width: '100%', padding: '16px', fontSize: '1.2rem' }}
          onClick={handleCheck}
          disabled={loading || !message.trim()}
        >
          {loading ? 'Checking...' : t.check_message}
        </button>
      </div>
    </div>
  );
};

export default Home;
