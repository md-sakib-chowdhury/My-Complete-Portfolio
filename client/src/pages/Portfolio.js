import React, { useEffect, useState } from 'react';
import API from '../api';
import './Portfolio.css';

export default function Portfolio() {
    const [about, setAbout] = useState({});
    const [projects, setProjects] = useState([]);
    const [skills, setSkills] = useState([]);
    const [experience, setExp] = useState([]);
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);

    useEffect(() => {
        API.get('/about').then(r => setAbout(r.data));
        API.get('/projects').then(r => setProjects(r.data));
        API.get('/skills').then(r => setSkills(r.data));
        API.get('/experience').then(r => setExp(r.data));
    }, []);

    const sendMsg = async e => {
        e.preventDefault();
        setSending(true);
        try {
            await API.post('/contact', form);
            setSent(true);
            setForm({ name: '', email: '', subject: '', message: '' });
        } catch { alert('Failed! Try again.'); }
        setSending(false);
    };

    const groups = skills.reduce((acc, s) => {
        acc[s.category] = acc[s.category] || [];
        acc[s.category].push(s);
        return acc;
    }, {});

    return (
        <div className="portfolio">

           

            {/* HERO */}
            <section className="hero" id="hero">
                <div className="hero-bg-circles">
                    <div className="circle c1" />
                    <div className="circle c2" />
                    <div className="circle c3" />
                </div>
                <div className="container hero-inner">
                    <div className="hero-text">
                        <p className="hero-greeting">👋 Hi, I'm</p>
                        <h1 className="hero-name">{about.name || 'Your Name'}</h1>
                        <h2 className="hero-title">{about.title || 'Full Stack Developer'}</h2>
                        <p className="hero-bio">{about.bio || 'Add your bio from admin panel.'}</p>
                        <div className="hero-btns">
                            <a href="#projects" className="btn btn-primary">View Projects ✨</a>
                            <a href="#contact" className="btn btn-outline">Contact Me</a>
                            {about.resumeUrl && <a href={about.resumeUrl} target="_blank" rel="noreferrer" className="btn btn-outline">Resume ↗</a>}
                        </div>
                        <div className="hero-socials">
                            {about.github && <a href={about.github} target="_blank" rel="noreferrer" className="social-link">GitHub</a>}
                            {about.linkedin && <a href={about.linkedin} target="_blank" rel="noreferrer" className="social-link">LinkedIn</a>}
                            {about.email && <a href={`mailto:${about.email}`} className="social-link">Email</a>}
                        </div>
                    </div>
                    <div className="hero-img-wrap">
                        {about.avatar
                            ? <img src={about.avatar} alt={about.name} className="hero-img" />
                            : <div className="hero-img-placeholder">📷<p>Add photo from admin</p></div>
                        }
                        <div className="hero-img-ring" />
                    </div>
                </div>
            </section>

            {/* ABOUT */}
            <section id="about">
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

            {/* PROJECTS */}
            <section id="projects">
                <div className="container">
                    <h2 className="section-title">Projects</h2>
                    <p className="section-sub">Things I've built with passion</p>
                    <div className="projects-grid">
                        {projects.length === 0 && <p className="muted">No projects yet. Add from admin panel.</p>}
                        {projects.map(p => (
                            <div key={p._id} className="card project-card">
                                {p.image
                                    ? <img src={p.image} alt={p.title} className="project-img" />
                                    : <div className="project-img-placeholder">🖼️</div>
                                }
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

            {/* SKILLS */}
            <section id="skills">
                <div className="container">
                    <h2 className="section-title">Skills</h2>
                    <p className="section-sub">Technologies I work with</p>
                    {skills.length === 0 && <p className="muted">No skills yet. Add from admin panel.</p>}
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

            {/* EXPERIENCE */}
            <section id="experience">
                <div className="container">
                    <h2 className="section-title">Experience</h2>
                    <p className="section-sub">My professional journey</p>
                    <div className="timeline">
                        {experience.length === 0 && <p className="muted">No experience yet. Add from admin panel.</p>}
                        {experience.map((e, i) => (
                            <div key={e._id} className="tl-item">
                                <div className="tl-dot" />
                                {i < experience.length - 1 && <div className="tl-line" />}
                                <div className="card tl-card">
                                    <h3>{e.position}</h3>
                                    <p className="tl-company">🏢 {e.company}</p>
                                    <p className="tl-date">📅 {e.startDate} — {e.current ? 'Present' : e.endDate}</p>
                                    <p className="muted">{e.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CONTACT */}
            <section id="contact">
                <div className="container">
                    <h2 className="section-title">Contact</h2>
                    <p className="section-sub">Let's work together!</p>
                    {sent
                        ? <div className="sent-box card">✅ Message sent! I'll get back to you soon.</div>
                        : (
                            <form className="contact-form card" onSubmit={sendMsg}>
                                <div className="form-row">
                                    <input placeholder="Your Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
                                    <input placeholder="Your Email" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
                                </div>
                                <input placeholder="Subject" value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} />
                                <textarea rows="5" placeholder="Your Message..." value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} required />
                                <button type="submit" className="btn btn-primary" disabled={sending}>
                                    {sending ? 'Sending...' : 'Send Message 🚀'}
                                </button>
                            </form>
                        )
                    }
                </div>
            </section>

            {/* FOOTER */}
            <footer className="footer">
                <div className="container">
                    <p>© 2024 {about.name || 'Portfolio'} — Built with ❤️ using MERN Stack</p>
                </div>
            </footer>
        </div>
    );
}