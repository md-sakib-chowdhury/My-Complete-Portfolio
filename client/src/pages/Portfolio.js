// import React, { useEffect, useState } from 'react';
// import API from '../api';
// import './Portfolio.css';

// export default function Portfolio() {
//     const [about, setAbout] = useState({});
//     const [projects, setProjects] = useState([]);
//     const [skills, setSkills] = useState([]);
//     const [experience, setExp] = useState([]);
//     const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
//     const [sending, setSending] = useState(false);
//     const [sent, setSent] = useState(false);

//     useEffect(() => {
//         API.get('/about').then(r => setAbout(r.data));
//         API.get('/projects').then(r => setProjects(r.data));
//         API.get('/skills').then(r => setSkills(r.data));
//         API.get('/experience').then(r => setExp(r.data));
//     }, []);

//     const sendMsg = async e => {
//         e.preventDefault();
//         setSending(true);
//         try {
//             await API.post('/contact', form);
//             setSent(true);
//             setForm({ name: '', email: '', subject: '', message: '' });
//         } catch { alert('Failed! Try again.'); }
//         setSending(false);
//     };

//     const groups = skills.reduce((acc, s) => {
//         acc[s.category] = acc[s.category] || [];
//         acc[s.category].push(s);
//         return acc;
//     }, {});

//     return (
//         <div className="portfolio">

           

//             {/* HERO */}
//             <section className="hero" id="hero">
//                 <div className="hero-bg-circles">
//                     <div className="circle c1" />
//                     <div className="circle c2" />
//                     <div className="circle c3" />
//                 </div>
//                 <div className="container hero-inner">
//                     <div className="hero-text">
//                         <p className="hero-greeting">👋 Hi, I'm</p>
//                         <h1 className="hero-name">{about.name || 'Your Name'}</h1>
//                         <h2 className="hero-title">{about.title || 'Full Stack Developer'}</h2>
//                         <p className="hero-bio">{about.bio || 'Add your bio from admin panel.'}</p>
//                         <div className="hero-btns">
//                             <a href="#projects" className="btn btn-primary">View Projects ✨</a>
//                             <a href="#contact" className="btn btn-outline">Contact Me</a>
//                             {about.resumeUrl && <a href={about.resumeUrl} target="_blank" rel="noreferrer" className="btn btn-outline">Resume ↗</a>}
//                         </div>
//                         <div className="hero-socials">
//                             {about.github && <a href={about.github} target="_blank" rel="noreferrer" className="social-link">GitHub</a>}
//                             {about.linkedin && <a href={about.linkedin} target="_blank" rel="noreferrer" className="social-link">LinkedIn</a>}
//                             {about.email && <a href={`mailto:${about.email}`} className="social-link">Email</a>}
//                         </div>
//                     </div>
//                     <div className="hero-img-wrap">
//                         {about.avatar
//                             ? <img src={about.avatar} alt={about.name} className="hero-img" />
//                             : <div className="hero-img-placeholder">📷<p>Add photo from admin</p></div>
//                         }
//                         <div className="hero-img-ring" />
//                     </div>
//                 </div>
//             </section>

//             {/* ABOUT */}
//             <section id="about">
//                 <div className="container">
//                     <h2 className="section-title">About Me</h2>
//                     <p className="section-sub">Get to know me better</p>
//                     <div className="about-grid">
//                         <div className="card about-card">
//                             <p className="about-bio">{about.bio || 'Add your bio from admin panel.'}</p>
//                             <div className="about-info">
//                                 {about.location && <div className="info-item"><span>📍</span><span>{about.location}</span></div>}
//                                 {about.email && <div className="info-item"><span>📧</span><span>{about.email}</span></div>}
//                                 {about.phone && <div className="info-item"><span>📱</span><span>{about.phone}</span></div>}
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </section>

//             {/* PROJECTS */}
//             <section id="projects">
//                 <div className="container">
//                     <h2 className="section-title">Projects</h2>
//                     <p className="section-sub">Things I've built with passion</p>
//                     <div className="projects-grid">
//                         {projects.length === 0 && <p className="muted">No projects yet. Add from admin panel.</p>}
//                         {projects.map(p => (
//                             <div key={p._id} className="card project-card">
//                                 {p.image
//                                     ? <img src={p.image} alt={p.title} className="project-img" />
//                                     : <div className="project-img-placeholder">🖼️</div>
//                                 }
//                                 <div className="project-body">
//                                     <h3>{p.title}</h3>
//                                     <p className="muted">{p.description}</p>
//                                     <div className="tags">{p.tags?.map(t => <span key={t} className="tag">{t}</span>)}</div>
//                                     <div className="project-links">
//                                         {p.liveUrl && <a href={p.liveUrl} target="_blank" rel="noreferrer" className="btn btn-primary">Live ↗</a>}
//                                         {p.githubUrl && <a href={p.githubUrl} target="_blank" rel="noreferrer" className="btn btn-outline">GitHub</a>}
//                                     </div>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </section>

//             {/* SKILLS */}
//             <section id="skills">
//                 <div className="container">
//                     <h2 className="section-title">Skills</h2>
//                     <p className="section-sub">Technologies I work with</p>
//                     {skills.length === 0 && <p className="muted">No skills yet. Add from admin panel.</p>}
//                     {Object.entries(groups).map(([cat, items]) => (
//                         <div key={cat} className="skill-group">
//                             <h3 className="skill-cat">{cat}</h3>
//                             <div className="skills-grid">
//                                 {items.map(s => (
//                                     <div key={s._id} className="card skill-card">
//                                         <span className="skill-icon">{s.icon}</span>
//                                         <span className="skill-name">{s.name}</span>
//                                         <div className="skill-bar-wrap">
//                                             <div className="skill-bar" style={{ width: `${s.level}%` }} />
//                                         </div>
//                                         <span className="skill-level">{s.level}%</span>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </section>

//             {/* EXPERIENCE */}
//             <section id="experience">
//                 <div className="container">
//                     <h2 className="section-title">Experience</h2>
//                     <p className="section-sub">My professional journey</p>
//                     <div className="timeline">
//                         {experience.length === 0 && <p className="muted">No experience yet. Add from admin panel.</p>}
//                         {experience.map((e, i) => (
//                             <div key={e._id} className="tl-item">
//                                 <div className="tl-dot" />
//                                 {i < experience.length - 1 && <div className="tl-line" />}
//                                 <div className="card tl-card">
//                                     <h3>{e.position}</h3>
//                                     <p className="tl-company">🏢 {e.company}</p>
//                                     <p className="tl-date">📅 {e.startDate} — {e.current ? 'Present' : e.endDate}</p>
//                                     <p className="muted">{e.description}</p>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </section>

//             {/* CONTACT */}
//             <section id="contact">
//                 <div className="container">
//                     <h2 className="section-title">Contact</h2>
//                     <p className="section-sub">Let's work together!</p>
//                     {sent
//                         ? <div className="sent-box card">✅ Message sent! I'll get back to you soon.</div>
//                         : (
//                             <form className="contact-form card" onSubmit={sendMsg}>
//                                 <div className="form-row">
//                                     <input placeholder="Your Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
//                                     <input placeholder="Your Email" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
//                                 </div>
//                                 <input placeholder="Subject" value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} />
//                                 <textarea rows="5" placeholder="Your Message..." value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} required />
//                                 <button type="submit" className="btn btn-primary" disabled={sending}>
//                                     {sending ? 'Sending...' : 'Send Message 🚀'}
//                                 </button>
//                             </form>
//                         )
//                     }
//                 </div>
//             </section>

//             {/* FOOTER */}
//             <footer className="footer">
//                 <div className="container">
//                     <p>© 2024 {about.name || 'Portfolio'} — Built with ❤️ using MERN Stack</p>
//                 </div>
//             </footer>
//         </div>
//     );
// }

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
        e.preventDefault(); setSending(true);
        try {
            await API.post('/contact', form);
            setSent(true); setForm({ name: '', email: '', subject: '', message: '' });
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
                <div className="container hero-inner">
                    <div className="hero-text">
                        <p className="hero-greeting">👋 Welcome to my portfolio</p>
                        <h1 className="hero-name">{about.name || 'Your Name'}<span className="hero-name-dot">.</span></h1>
                        <h2 className="hero-title">{about.title || 'Full Stack Developer'}</h2>
                        <p className="hero-bio">{about.bio || 'Add your bio from admin panel.'}</p>
                        <div className="hero-btns">
                            <a href="/projects" className="btn btn-primary">My Projects ↗</a>
                            {about.resumeUrl && (
                                <a href={about.resumeUrl} target="_blank" rel="noreferrer" className="btn btn-outline">
                                    ↓ Download CV
                                </a>
                            )}
                        </div>
                        <div className="hero-socials">
                            {about.github && (
                                <a href={about.github} target="_blank" rel="noreferrer" className="social-icon" title="GitHub">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" /></svg>
                                </a>
                            )}
                            {about.linkedin && (
                                <a href={about.linkedin} target="_blank" rel="noreferrer" className="social-icon" title="LinkedIn">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                                </a>
                            )}
                            {about.email && (
                                <a href={`mailto:${about.email}`} className="social-icon" title="Email">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                                </a>
                            )}
                        </div>

                        {/* Stats */}
                        <div className="hero-stats">
                            <div className="stat-item">
                                <span className="stat-num">2+</span>
                                <span className="stat-label">Years Experience</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-num">{projects.length}+</span>
                                <span className="stat-label">Projects Done</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-num">100%</span>
                                <span className="stat-label">Client Satisfaction</span>
                            </div>
                        </div>
                    </div>

                    {/* Hero Image */}
                    <div className="hero-img-wrap">
                        <div className="hero-img-frame">
                            {about.avatar
                                ? <img src={about.avatar} alt={about.name} className="hero-img" />
                                : <div className="hero-img-placeholder">📷<p style={{ fontSize: '0.85rem' }}>Add photo from admin</p></div>
                            }
                        </div>
                        <div className="hero-img-badge">
                            <span className="badge-icon">⭐</span>
                            <div>
                                <div className="badge-num">Top Rated</div>
                                <div className="badge-text">Developer</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ABOUT */}
            <section id="about" style={{ background: 'var(--bg2)' }}>
                <div className="container">
                    <div className="about-grid">
                        <div className="about-img-wrap">
                            {about.avatar
                                ? <img src={about.avatar} alt={about.name} className="about-img" />
                                : <div className="about-img-placeholder">👤</div>
                            }
                        </div>
                        <div className="about-content">
                            <h2><span>About</span> Me</h2>
                            <p className="about-bio">{about.bio || 'Add your bio from admin panel.'}</p>
                            <div className="about-info">
                                {about.location && <div className="info-item"><span>📍</span><span>{about.location}</span></div>}
                                {about.email && <div className="info-item"><span>📧</span><span>{about.email}</span></div>}
                                {about.phone && <div className="info-item"><span>📱</span><span>{about.phone}</span></div>}
                            </div>
                            <div className="about-btns">
                                <a href="/contact" className="btn btn-primary">Let's Talk ↗</a>
                                {about.resumeUrl && (
                                    <a href={about.resumeUrl} target="_blank" rel="noreferrer" className="btn btn-outline">↓ Portfolio</a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* PROJECTS */}
            <section id="projects">
                <div className="container">
                    <h2 className="section-title">My <span style={{ color: 'var(--gold)' }}>Projects</span></h2>
                    <p className="section-sub">Things I've built with passion</p>
                    <div className="projects-grid">
                        {projects.length === 0 && <p className="muted">No projects yet. Add from admin panel.</p>}
                        {projects.map(p => (
                            <div key={p._id} className="card project-card">
                                {p.image ? <img src={p.image} alt={p.title} className="project-img" /> : <div className="project-img-placeholder">🖼️</div>}
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
            <section id="skills" style={{ background: 'var(--bg2)' }}>
                <div className="container">
                    <h2 className="section-title">My <span style={{ color: 'var(--gold)' }}>Skills</span></h2>
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
                                        <div className="skill-bar-wrap"><div className="skill-bar" style={{ width: `${s.level}%` }} /></div>
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
                    <h2 className="section-title">My <span style={{ color: 'var(--gold)' }}>Experience</span></h2>
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
            <section id="contact" style={{ background: 'var(--bg2)' }}>
                <div className="container">
                    <h2 className="section-title">Get In <span style={{ color: 'var(--gold)' }}>Touch</span></h2>
                    <p className="section-sub">Let's work together!</p>
                    {sent ? (
                        <div className="sent-box card">✅ Message sent! I'll get back to you soon.</div>
                    ) : (
                        <form className="contact-form card" onSubmit={sendMsg}>
                            <div className="form-row">
                                <input placeholder="Your Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
                                <input placeholder="Your Email" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
                            </div>
                            <input placeholder="Subject" value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} />
                            <textarea rows="5" placeholder="Your Message..." value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} required />
                            <button type="submit" className="btn btn-primary" disabled={sending}>
                                {sending ? 'Sending...' : 'Send Message ↗'}
                            </button>
                        </form>
                    )}
                </div>
            </section>

            {/* FOOTER */}
            <footer className="footer">
                <div className="container">
                    <div className="footer-inner">
                        <div className="footer-brand">
                            <span className="logo">{about.name || 'Portfolio'}<span className="logo-dot">.</span></span>
                            <p className="footer-desc">{about.bio?.slice(0, 120) || 'Full Stack Developer building modern web applications.'}</p>
                            <div className="footer-socials">
                                {about.github && <a href={about.github} target="_blank" rel="noreferrer" className="social-icon">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" /></svg>
                                </a>}
                                {about.linkedin && <a href={about.linkedin} target="_blank" rel="noreferrer" className="social-icon">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                                </a>}
                            </div>
                        </div>
                        <div>
                            <p className="footer-title">Quick Links</p>
                            <div className="footer-links">
                                <a href="/about">About</a>
                                <a href="/projects">Projects</a>
                                <a href="/skills">Skills</a>
                                <a href="/experience">Experience</a>
                                <a href="/certificates">Certificates</a>
                                <a href="/blogs">Blogs</a>
                            </div>
                        </div>
                        <div>
                            <p className="footer-title">Contact</p>
                            <div className="footer-links">
                                {about.email && <a href={`mailto:${about.email}`}>{about.email}</a>}
                                {about.phone && <a href={`tel:${about.phone}`}>{about.phone}</a>}
                                {about.location && <span style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>📍 {about.location}</span>}
                            </div>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <p>© 2025 {about.name || 'Portfolio'}. All rights reserved.</p>
                        <p>Built with ❤️ using MERN Stack</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}