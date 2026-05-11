import React, { useEffect, useState } from 'react';
import API from '../api';
import './Portfolio.css';

export default function AboutPage() {
    const [about, setAbout] = useState({});
    useEffect(() => { API.get('/about').then(r => setAbout(r.data)); }, []);

    return (
        <div className="portfolio">
            <section id="about" style={{ paddingTop: '100px' }}>
                <div className="container">
                    <h2 className="section-title">About Me</h2>
                    <p className="section-sub">Get to know me better</p>
                    <div className="about-grid">
                        <div className="card about-card">
                            <p className="about-bio">{about.bio || 'Add your bio from admin panel.'}</p>
                            <div className="about-info">
                                {about.location && <div className="info-item"><span>📍</span><span>{about.location}</span></div>}
                                {about.email && <div className="info-item"><span>📧</span><span>{about.email}</span></div>}
                                {about.phone && <div className="info-item"><span>📱</span><span>{about.phone}</span></div>}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}