import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';

const Profile = () => {
  const { user, logout, updateLang } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) return null;

  return (
    <div style={{ padding: '24px', maxWidth: '600px', margin: '0 auto' }} className="fade-in">
      <h2 style={{ fontSize: '2rem', color: 'var(--primary)', marginBottom: '24px' }}>Profile</h2>
      
      <div className="card">
        <h3 style={{ marginBottom: '8px' }}>{user.name}</h3>
        <p style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>{user.phone}</p>
        
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Preferred Language</label>
        <select 
          className="input-field" 
          value={user.preferredLanguage} 
          onChange={(e) => updateLang(e.target.value)}
        >
          <option value="en">English</option>
          <option value="te">తెలుగు (Telugu)</option>
          <option value="hi">हिन्दी (Hindi)</option>
        </select>
        
        {user.role === 'admin' && (
          <button className="btn btn-primary" style={{ width: '100%', marginBottom: '16px' }} onClick={() => navigate('/admin')}>
            Go to Admin Portal
          </button>
        )}

        <button className="btn btn-outline" style={{ width: '100%', color: 'var(--danger)', borderColor: 'var(--danger)' }} onClick={handleLogout}>
          <LogOut size={20} /> Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
