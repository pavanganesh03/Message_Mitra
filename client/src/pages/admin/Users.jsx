import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { Ban, Trash2 } from 'lucide-react';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await api.get('/admin/users');
      setUsers(res.data);
    } catch(e) { console.error(e); }
  };

  const handleBlock = async (id) => {
    await api.put(`/admin/users/${id}/block`);
    fetchUsers();
  };

  const handleDelete = async (id) => {
    if(window.confirm('Are you sure?')) {
      await api.delete(`/admin/users/${id}`);
      fetchUsers();
    }
  };

  return (
    <div>
      <h2>Manage Users</h2>
      <div style={{ marginTop: '20px', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white', boxShadow: 'var(--shadow)' }}>
          <thead>
            <tr style={{ background: '#e5e7eb', textAlign: 'left' }}>
              <th style={{ padding: '12px' }}>Name</th>
              <th style={{ padding: '12px' }}>Phone</th>
              <th style={{ padding: '12px' }}>Role</th>
              <th style={{ padding: '12px' }}>Status</th>
              <th style={{ padding: '12px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u._id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '12px' }}>{u.name}</td>
                <td style={{ padding: '12px' }}>{u.phone}</td>
                <td style={{ padding: '12px' }}>{u.role}</td>
                <td style={{ padding: '12px' }}>{u.isBlocked ? 'Blocked' : 'Active'}</td>
                <td style={{ padding: '12px', display: 'flex', gap: '8px' }}>
                  <button onClick={() => handleBlock(u._id)} style={{ cursor: 'pointer', padding: '4px', border: '1px solid gray', borderRadius: '4px' }}>
                    <Ban size={16} color={u.isBlocked ? 'green' : 'orange'} />
                  </button>
                  <button onClick={() => handleDelete(u._id)} style={{ cursor: 'pointer', padding: '4px', border: '1px solid gray', borderRadius: '4px' }}>
                    <Trash2 size={16} color="red" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
