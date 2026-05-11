import React, { useEffect, useState } from 'react';
import API from '../api';
import './Portfolio.css';

export default function BlogsPage() {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => { API.get('/blogs').then(r => setBlogs(r.data)); }, []);

    return (
        <div className="portfolio">
            <section style={{ paddingTop: '100px' }}>
                <div className="container">
                    <h2 className="section-title">Blog & Articles</h2>
                    <p className="section-sub">My thoughts and writings</p>
                    {blogs.length === 0 && <p className="muted">No blogs yet.</p>}
                    <div className="projects-grid">
                        {blogs.map(b => (
                            <div key={b._id} className="card project-card">
                                {b.thumbnail
                                    ? <img src={b.thumbnail} alt={b.title} className="project-img" />
                                    : <div className="project-img-placeholder">📝</div>
                                }
                                <div className="project-body">
                                    <h3>{b.title}</h3>
                                    <p className="muted" style={{ WebkitLineClamp: 3, display: '-webkit-box', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                        {b.content}
                                    </p>
                                    <div className="tags" style={{ marginTop: '0.75rem' }}>
                                        {b.tags?.map(t => <span key={t} className="tag">#{t}</span>)}
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