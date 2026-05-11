import React, { useEffect, useState } from 'react';
import API from '../api';
import './Portfolio.css';

export default function SkillsPage() {
    const [skills, setSkills] = useState([]);
    useEffect(() => { API.get('/skills').then(r => setSkills(r.data)); }, []);

    const groups = skills.reduce((acc, s) => {
        acc[s.category] = acc[s.category] || [];
        acc[s.category].push(s);
        return acc;
    }, {});

    return (
        <div className="portfolio">
            <section id="skills" style={{ paddingTop: '100px' }}>
                <div className="container">
                    <h2 className="section-title">Skills</h2>
                    <p className="section-sub">Technologies I work with</p>
                    {skills.length === 0 && <p className="muted">No skills yet.</p>}
                    {Object.entries(groups).map(([cat, items]) => (
                        <div key={cat} className="skill-group">
                            <h3 className="skill-cat">{cat}</h3>
                            <div className="skills-grid">
                                {items.map(s => (
                                    <div key={s._id} className="card skill-card">
                                        <span className="skill-icon">{s.icon}</span>
                                        <span className="skill-name">{s.name}</span>
                                        <div className="skill-bar-wrap">
                                            <div className="skill-bar" style={{ width: `${s.level}%` }} />
                                        </div>
                                        <span className="skill-level">{s.level}%</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}