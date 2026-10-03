import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, MessageSquare, ShieldAlert, FileWarning, LogOut } from 'lucide-react';

const AdminLayout = () => {
  const navigate = useNavigate();

  return (
    <div className="admin-layout">
      <div className="admin-sidebar">
        <h2 style={{ marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ShieldAlert /> Admin Portal
        </h2>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <Link to="/admin" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px' }}>
            <LayoutDashboard size={20} /> Dashboard
          </Link>
          <Link to="/admin/users" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px' }}>
            <Users size={20} /> Users
          </Link>
          <Link to="/admin/messages" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px' }}>
            <MessageSquare size={20} /> Messages
          </Link>
          <Link to="/admin/scampatterns" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px' }}>
            <ShieldAlert size={20} /> Scam Patterns
          </Link>
          <Link to="/admin/reports" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px' }}>
            <FileWarning size={20} /> Reports
          </Link>
        </nav>
        <button 
          onClick={() => navigate('/home')} 
          style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', color: '#fca5a5', cursor: 'pointer', padding: '8px', width: '100%' }}
        >
          <LogOut size={20} /> Exit Admin
        </button>
      </div>
      <div className="admin-content">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
