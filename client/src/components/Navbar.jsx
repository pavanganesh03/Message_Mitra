import React, { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ShieldCheck, UserCircle } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import * as i18n from '../i18n';

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const lang = user?.preferredLanguage || 'en';
  const t = i18n[lang];

  if (location.pathname.startsWith('/admin')) return null;

  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '16px', background: 'var(--primary)', color: 'white', alignItems: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }} onClick={() => navigate(user ? '/home' : '/')}>
        <ShieldCheck size={28} />
        <h2 style={{ fontSize: '1.2rem', margin: 0 }}>{t.app_name}</h2>
      </div>
      {user && (
        <div style={{ cursor: 'pointer' }} onClick={() => navigate('/profile')}>
          <UserCircle size={28} />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
