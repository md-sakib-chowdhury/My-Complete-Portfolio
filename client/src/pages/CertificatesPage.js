import React, { useEffect, useState } from 'react';
import API from '../api';
import './Portfolio.css';

export default function CertificatesPage() {
    const [certs, setCerts] = useState([]);

    useEffect(() => { API.get('/certificates').then(r => setCerts(r.data)); }, []);

    return (
        <div className="portfolio">
            <section style={{ paddingTop: '100px' }}>
                <div className="container">
                    <h2 className="section-title">Certificates</h2>
                    <p className="section-sub">My professional certifications & achievements</p>
                    {certs.length === 0 && <p className="muted">No certificates yet.</p>}
                    <div className="projects-grid">
                        {certs.map(c => (
                            <div key={c._id} className="card project-card">
                                {c.image
                                    ? <img src={c.image} alt={c.title} className="project-img" />
                                    : <div className="project-img-placeholder">🏅</div>
                                }
                                <div className="project-body">
                                    <h3>{c.title}</h3>
                                    <p className="muted">🏢 {c.issuer}</p>
                                    <p className="muted">📅 {c.date}</p>
                                    {c.link && (
                                        <a href={c.link} target="_blank" rel="noreferrer" className="btn btn-outline" style={{ marginTop: '1rem' }}>
                                            🔗 Verify Certificate
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}