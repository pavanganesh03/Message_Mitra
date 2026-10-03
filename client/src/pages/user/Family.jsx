import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { UserPlus, Trash2 } from 'lucide-react';

const Family = () => {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const res = await api.get('/family');
      setContacts(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await api.post('/family', { name, phone });
      setName('');
      setPhone('');
      fetchContacts();
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/family/${id}`);
      fetchContacts();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div style={{ padding: '24px', maxWidth: '600px', margin: '0 auto' }} className="fade-in">
      <h2 style={{ fontSize: '2rem', color: 'var(--primary)', marginBottom: '24px' }}>Trusted Family</h2>
      
      <form onSubmit={handleAdd} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <input className="input-field" placeholder="Name (e.g. Son, Daughter)" value={name} onChange={(e) => setName(e.target.value)} required />
        <input className="input-field" type="tel" placeholder="WhatsApp Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        <button type="submit" className="btn btn-primary"><UserPlus size={20} /> Add Contact</button>
      </form>

      <div style={{ marginTop: '24px' }}>
        {contacts.map(c => (
          <div key={c._id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px' }}>
            <div>
              <h4 style={{ margin: 0 }}>{c.name}</h4>
              <p style={{ color: 'var(--text-muted)', margin: 0 }}>{c.phone}</p>
            </div>
            <button onClick={() => handleDelete(c._id)} style={{ background: 'none', border: 'none', color: 'var(--danger)', cursor: 'pointer' }}>
              <Trash2 size={20} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Family;
