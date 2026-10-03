import React, { useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ShieldAlert, CheckCircle, AlertTriangle, Volume2, Bookmark, Share2 } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';
import * as i18n from '../../i18n';
import api from '../../services/api';

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  
  const result = location.state?.result;
  const lang = user?.preferredLanguage || 'en';
  const t = i18n[lang];

  useEffect(() => {
    if (!result) navigate('/home');
  }, [result, navigate]);

  if (!result) return null;

  const getMeterClass = () => {
    if (result.riskLevel === 'Danger') return 'Danger';
    if (result.riskLevel === 'Be Careful') return 'Careful';
    return 'Safe';
  };

  const getIcon = () => {
    if (result.riskLevel === 'Danger') return <ShieldAlert size={48} color="var(--danger)" />;
    if (result.riskLevel === 'Be Careful') return <AlertTriangle size={48} color="var(--careful)" />;
    return <CheckCircle size={48} color="var(--safe)" />;
  };

  const getColor = () => {
    if (result.riskLevel === 'Danger') return 'var(--danger)';
    if (result.riskLevel === 'Be Careful') return 'var(--careful)';
    return 'var(--safe)';
  };

  const handleListen = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(result.explanation);
      if (lang === 'hi') utterance.lang = 'hi-IN';
      else if (lang === 'te') utterance.lang = 'te-IN';
      else utterance.lang = 'en-IN';
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Text to speech not supported in this browser.");
    }
  };

  const handleSave = async () => {
    if (!user) return alert("Please login to save messages");
    try {
      await api.post(`/saved/${result._id}`, { note: '' });
      alert("Saved!");
    } catch (e) {
      console.error(e);
    }
  };

  const handleShare = () => {
    const text = encodeURIComponent(`Message Mitra Alert [${result.riskLevel}]:\n\nOriginal: ${result.originalText}\n\nExplanation: ${result.explanation}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <div style={{ padding: '24px', maxWidth: '600px', margin: '0 auto' }} className="fade-in">
      <div className="card" style={{ textAlign: 'center', borderTop: `6px solid ${getColor()}` }}>
        {getIcon()}
        <h2 style={{ fontSize: '2rem', color: getColor(), margin: '12px 0' }}>
          {result.riskLevel === 'Danger' ? t.danger : result.riskLevel === 'Be Careful' ? t.be_careful : t.safe}
        </h2>
        
        <div className="meter-container">
          <div className={`meter-fill ${getMeterClass()}`}></div>
        </div>

        <div style={{ background: '#f3f4f6', padding: '16px', borderRadius: '8px', margin: '20px 0', textAlign: 'left' }}>
          <p style={{ fontStyle: 'italic', color: 'var(--text-muted)', fontSize: '1rem' }}>"{result.originalText}"</p>
        </div>

        <h3 style={{ fontSize: '1.2rem', textAlign: 'left', marginBottom: '8px' }}>{t.explanation}</h3>
        <p style={{ fontSize: '1.3rem', textAlign: 'left', fontWeight: '500', marginBottom: '24px' }}>
          {result.explanation}
        </p>

        <button className="btn btn-outline" onClick={handleListen} style={{ width: '100%', marginBottom: '24px' }}>
          <Volume2 size={24} /> {t.listen}
        </button>

        {result.actions && result.actions.length > 0 && (
          <div style={{ textAlign: 'left', background: '#fffbeb', padding: '16px', borderRadius: '8px', border: '1px solid #fde68a' }}>
            <h4 style={{ marginBottom: '12px', color: '#b45309' }}>{t.actions}:</h4>
            <ul style={{ paddingLeft: '24px', color: '#92400e' }}>
              {result.actions.map((act, i) => <li key={i} style={{ marginBottom: '8px' }}>{act}</li>)}
            </ul>
          </div>
        )}

        <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
          <button className="btn btn-primary" style={{ flex: 1 }} onClick={handleShare}>
            <Share2 size={20} /> Share
          </button>
          <button className="btn btn-outline" style={{ flex: 1 }} onClick={handleSave}>
            <Bookmark size={20} /> Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Result;
