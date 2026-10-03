import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, BookOpen, Volume2, ShieldCheck } from 'lucide-react';
import * as i18n from '../../i18n';

const Landing = () => {
  const navigate = useNavigate();
  const t = i18n.en; // Default to English for landing

  return (
    <div style={{ padding: '24px', textAlign: 'center' }} className="fade-in">
      <div style={{ margin: '40px 0' }}>
        <ShieldCheck size={80} color="var(--primary)" style={{ margin: '0 auto' }} />
        <h1 style={{ fontSize: '2.5rem', color: 'var(--primary)', marginTop: '16px' }}>{t.app_name}</h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>{t.tagline}</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px', margin: '0 auto 40px' }}>
        <button className="btn btn-primary" onClick={() => navigate('/login')}>{t.login}</button>
        <button className="btn btn-outline" onClick={() => navigate('/register')}>{t.register}</button>
        <button className="btn btn-outline" style={{ border: 'none', textDecoration: 'underline' }} onClick={() => navigate('/home')}>{t.guest_mode}</button>
      </div>

      <div style={{ textAlign: 'left', maxWidth: '600px', margin: '0 auto' }}>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '20px', textAlign: 'center' }}>How it works</h3>
        
        <div className="card" style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
          <BookOpen size={32} color="var(--primary)" />
          <div>
            <h4 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>1. Paste Message</h4>
            <p style={{ color: 'var(--text-muted)' }}>Copy any confusing SMS and paste it into the app.</p>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
          <ShieldAlert size={32} color="var(--danger)" />
          <div>
            <h4 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>2. Fraud Check</h4>
            <p style={{ color: 'var(--text-muted)' }}>We instantly check for dangerous links, OTP requests, and scams.</p>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
          <Volume2 size={32} color="var(--primary)" />
          <div>
            <h4 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>3. Listen & Understand</h4>
            <p style={{ color: 'var(--text-muted)' }}>Get a simple explanation in your own language, and listen to it out loud.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
