import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import API from '../api';
import '../pages/Portfolio.css';

export default function Navbar() {
    const [about, setAbout] = useState({});
    const location = useLocation();

    useEffect(() => { API.get('/about').then(r => setAbout(r.data)); }, []);

    const links = ['about', 'projects', 'skills', 'experience', 'contact'];

    return (
        <nav className="navbar">
            <div className="container nav-inner">
                <Link to="/" className="logo" style={{ textDecoration: 'none' }}>
                    {about.name || 'Portfolio'}
                </Link>
                <ul className="nav-links">
                    {links.map(s => (
                        <li key={s}>
                            <Link
                                to={`/${s}`}
                                className={location.pathname === `/${s}` ? 'active' : ''}
                                style={{ textDecoration: 'none' }}
                            >
                                {s.charAt(0).toUpperCase() + s.slice(1)}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}