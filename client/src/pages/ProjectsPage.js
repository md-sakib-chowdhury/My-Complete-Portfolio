import React, { useEffect, useState } from 'react';
import API from '../api';
import './Portfolio.css';

export default function ProjectsPage() {
    const [projects, setProjects] = useState([]);
    useEffect(() => { API.get('/projects').then(r => setProjects(r.data)); }, []);

    return (
        <div className="portfolio">
            <section id="projects" style={{ paddingTop: '100px' }}>
                <div className="container">
                    <h2 className="section-title">Projects</h2>
                    <p className="section-sub">Things I've built with passion</p>
                    <div className="projects-grid">
                        {projects.length === 0 && <p className="muted">No projects yet.</p>}
                        {projects.map(p => (
                            <div key={p._id} className="card project-card">
                                {p.image
                                    ? <img src={p.image} alt={p.title} className="project-img" />
                                    : <div className="project-img-placeholder">🖼️</div>}
                                <div className="project-body">
                                    <h3>{p.title}</h3>
                                    <p className="muted">{p.description}</p>
                                    <div className="tags">{p.tags?.map(t => <span key={t} className="tag">{t}</span>)}</div>
                                    <div className="project-links">
                                        {p.liveUrl && <a href={p.liveUrl} target="_blank" rel="noreferrer" className="btn btn-primary">Live ↗</a>}
                                        {p.githubUrl && <a href={p.githubUrl} target="_blank" rel="noreferrer" className="btn btn-outline">GitHub</a>}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}