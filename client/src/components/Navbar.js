// import React, { useState, useEffect } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import API from '../api';
// import '../pages/Portfolio.css';

// export default function Navbar() {
//     const [about, setAbout] = useState({});
//     const location = useLocation();

//     useEffect(() => { API.get('/about').then(r => setAbout(r.data)); }, []);

//     const links = ['about', 'projects', 'skills', 'experience', 'certificates', 'blogs', 'contact'];

//     return (
//         <nav className="navbar">
//             <div className="container nav-inner">
//                 <Link to="/" className="logo" style={{ textDecoration: 'none' }}>
//                     {about.name || 'Portfolio'}
//                 </Link>
//                 <ul className="nav-links">
//                     {links.map(s => (
//                         <li key={s}>
//                             <Link
//                                 to={`/${s}`}
//                                 className={location.pathname === `/${s}` ? 'active' : ''}
//                                 style={{ textDecoration: 'none' }}
//                             >
//                                 {s.charAt(0).toUpperCase() + s.slice(1)}
//                             </Link>
//                         </li>
//                     ))}
//                 </ul>
//             </div>
//         </nav>
//     );
// }
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import API from '../api';
import '../pages/Portfolio.css';

export default function Navbar() {
    const [about, setAbout] = useState({});
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        API.get('/about').then(r => setAbout(r.data));
    }, []);

    // Close menu on route change
    useEffect(() => {
        setMenuOpen(false);
    }, [location.pathname]);

    const links = ['about', 'projects', 'skills', 'experience', 'certificates', 'blogs', 'contact'];

    return (
        <>
            <nav className="navbar">
                <div className="container nav-inner">
                    {/* Logo — Home এ যাবে click করলে */}
                    <Link to="/" className="logo" style={{ textDecoration: 'none' }}>
                        {about.name || 'Portfolio'}
                    </Link>

                    {/* Desktop Navigation */}
                    <ul className="nav-links">
                        {/* Home Button */}
                        <li>
                            <Link
                                to="/"
                                className={location.pathname === '/' ? 'active' : ''}
                                style={{ textDecoration: 'none' }}
                            >
                                Home
                            </Link>
                        </li>

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

                    {/* Hamburger Button (Mobile/Tablet) */}
                    <button
                        className={`hamburger ${menuOpen ? 'open' : ''}`}
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle menu"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>

                {/* Mobile Dropdown Menu */}
                <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
                    <ul>
                        {/* Home Button in Mobile */}
                        <li>
                            <Link
                                to="/"
                                className={location.pathname === '/' ? 'active' : ''}
                                style={{ textDecoration: 'none' }}
                                onClick={() => setMenuOpen(false)}
                            >
                                Home
                            </Link>
                        </li>

                        {links.map(s => (
                            <li key={s}>
                                <Link
                                    to={`/${s}`}
                                    className={location.pathname === `/${s}` ? 'active' : ''}
                                    style={{ textDecoration: 'none' }}
                                    onClick={() => setMenuOpen(false)}
                                >
                                    {s.charAt(0).toUpperCase() + s.slice(1)}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>

            {/* Overlay for mobile menu */}
            {menuOpen && (
                <div
                    className="menu-overlay"
                    onClick={() => setMenuOpen(false)}
                />
            )}
        </>
    );
}