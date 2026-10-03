import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import * as i18n from '../../i18n';

const Register = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [lang, setLang] = useState('en');
  const [error, setError] = useState('');
  
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();
  const t = i18n.en;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(name, phone, password, lang);
      navigate('/home');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div style={{ padding: '24px', maxWidth: '400px', margin: '40px auto' }} className="fade-in">
      <h2 style={{ fontSize: '2rem', marginBottom: '24px', color: 'var(--primary)' }}>{t.register}</h2>
      {error && <p style={{ color: 'var(--danger)', marginBottom: '16px' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Full Name" 
          className="input-field" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
        />
        <input 
          type="tel" 
          placeholder="Phone Number" 
          className="input-field" 
          value={phone} 
          onChange={(e) => setPhone(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          className="input-field" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <select className="input-field" value={lang} onChange={(e) => setLang(e.target.value)}>
          <option value="en">English</option>
          <option value="te">తెలుగు (Telugu)</option>
          <option value="hi">हिन्दी (Hindi)</option>
        </select>
        <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>{t.register}</button>
      </form>
    </div>
  );
};

export default Register;
