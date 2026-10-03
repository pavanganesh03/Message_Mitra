import React, { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Bookmark, Users, Clock, Settings, ShieldCheck } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import * as i18n from '../i18n';

const BottomNav = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const lang = user?.preferredLanguage || 'en';
  const t = i18n[lang];

  // Don't show bottom nav on admin routes, landing, login, register
  const hidePaths = ['/', '/login', '/register', '/admin'];
  if (hidePaths.some(p => location.pathname.startsWith(p) && p !== '/')) {
    if (location.pathname !== '/' || !user) return null; // allow home to show
  }
  if (location.pathname === '/') return null;

  return (
    <div className="bottom-nav">
      <div className={`nav-item ${location.pathname === '/home' ? 'active' : ''}`} onClick={() => navigate('/home')}>
        <Home size={24} />
        <span>{t.home}</span>
      </div>
      <div className={`nav-item ${location.pathname === '/saved' ? 'active' : ''}`} onClick={() => navigate('/saved')}>
        <Bookmark size={24} />
        <span>{t.saved}</span>
      </div>
      <div className={`nav-item ${location.pathname === '/family' ? 'active' : ''}`} onClick={() => navigate('/family')}>
        <Users size={24} />
        <span>{t.family}</span>
      </div>
      <div className={`nav-item ${location.pathname === '/history' ? 'active' : ''}`} onClick={() => navigate('/history')}>
        <Clock size={24} />
        <span>{t.history}</span>
      </div>
    </div>
  );
};

export default BottomNav;
