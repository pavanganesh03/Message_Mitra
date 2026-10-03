import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/user/Landing';
import Login from './pages/user/Login';
import Register from './pages/user/Register';
import Home from './pages/user/Home';
import Result from './pages/user/Result';
import Saved from './pages/user/Saved';
import Family from './pages/user/Family';
import History from './pages/user/History';
import Profile from './pages/user/Profile';

import AdminLayout from './pages/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import Users from './pages/admin/Users';
import Messages from './pages/admin/Messages';
import ScamPatterns from './pages/admin/ScamPatterns';
import Reports from './pages/admin/Reports';

import ProtectedRoute from './components/ProtectedRoute';
import BottomNav from './components/BottomNav';
import Navbar from './components/Navbar';

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Navbar />
        <Routes>
          {/* Public / Guest Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* User Routes (Some work for guests, some protected) */}
          <Route path="/home" element={<Home />} />
          <Route path="/result" element={<Result />} />
          <Route path="/saved" element={<ProtectedRoute><Saved /></ProtectedRoute>} />
          <Route path="/family" element={<ProtectedRoute><Family /></ProtectedRoute>} />
          <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

          {/* Admin Routes */}
          <Route path="/admin" element={<ProtectedRoute adminOnly={true}><AdminLayout /></ProtectedRoute>}>
            <Route index element={<Dashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="messages" element={<Messages />} />
            <Route path="scampatterns" element={<ScamPatterns />} />
            <Route path="reports" element={<Reports />} />
          </Route>
        </Routes>
        <BottomNav />
      </div>
    </BrowserRouter>
  );
}

export default App;
