import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import * as i18n from '../../i18n';

const Login = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const t = i18n.en;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await login(phone, password);
      if (user.role === 'admin') navigate('/admin');
      else navigate('/home');
    } catch (err) {
      setError('Invalid phone or password');
    }
  };

  return (
    <div style={{ padding: '24px', maxWidth: '400px', margin: '40px auto' }} className="fade-in">
      <h2 style={{ fontSize: '2rem', marginBottom: '24px', color: 'var(--primary)' }}>{t.login}</h2>
      {error && <p style={{ color: 'var(--danger)', marginBottom: '16px' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
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
        <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>{t.login}</button>
      </form>
      <p style={{ marginTop: '20px', textAlign: 'center' }}>
        Don't have an account? <span style={{ color: 'var(--primary)', cursor: 'pointer' }} onClick={() => navigate('/register')}>Register</span>
      </p>
    </div>
  );
};

export default Login;
