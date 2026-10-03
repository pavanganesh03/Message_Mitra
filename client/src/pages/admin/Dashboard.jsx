import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';

const COLORS = ['#0d9488', '#f59e0b', '#ef4444', '#3b82f6', '#8b5cf6', '#10b981'];

const Dashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get('/admin/stats').then(res => setStats(res.data)).catch(console.error);
  }, []);

  if (!stats) return <div>Loading...</div>;

  const pieData = stats.categoryBreakdown.map(c => ({ name: c._id, value: c.count }));

  return (
    <div className="fade-in">
      <h2>Dashboard</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '20px' }}>
        <div className="card">
          <h3 style={{ color: 'var(--text-muted)' }}>Total Users</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{stats.totalUsers}</p>
        </div>
        <div className="card">
          <h3 style={{ color: 'var(--text-muted)' }}>Analyzed Messages</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{stats.totalMessages}</p>
        </div>
        <div className="card">
          <h3 style={{ color: 'var(--text-muted)' }}>Fraud Detected</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--danger)' }}>{stats.fraudMessages}</p>
        </div>
      </div>

      <div className="card" style={{ marginTop: '20px', height: '400px' }}>
        <h3>Categories</h3>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={pieData} cx="50%" cy="50%" outerRadius={120} fill="#8884d8" dataKey="value" label>
              {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
            </Pie>
            <RechartsTooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
