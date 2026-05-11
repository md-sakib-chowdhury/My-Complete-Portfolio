import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';
import './AdminLogin.css';

export default function AdminLogin() {
    const [form, setForm] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async e => {
        e.preventDefault();
        setLoading(true); setError('');
        try {
            const { data } = await API.post('/auth/login', form);
            localStorage.setItem('adminToken', data.token);
            navigate('/admin/dashboard');
        } catch { setError('Invalid username or password'); }
        setLoading(false);
    };

    return (
        <div className="login-page">
            <div className="login-bg">
                <div className="login-circle lc1" />
                <div className="login-circle lc2" />
            </div>
            <form className="login-card" onSubmit={handleLogin}>
                <div className="login-logo">⚡</div>
                <h2>Admin Panel</h2>
                <p className="muted">Portfolio Management System</p>
                {error && <div className="error-msg">⚠️ {error}</div>}
                <input placeholder="Username" value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} required />
                <input type="password" placeholder="Password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required />
                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login →'}
                </button>
            </form>
        </div>
    );
}