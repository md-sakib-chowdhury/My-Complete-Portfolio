
// import React, { useEffect, useState } from 'react';
// import API from '../api';
// import './Portfolio.css';
// import Footer from '../components/Footer';

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
//         e.preventDefault(); setSending(true);
//         try {
//             await API.post('/contact', form);
//             setSent(true); setForm({ name: '', email: '', subject: '', message: '' });
//         } catch { alert('Failed! Try again.'); }
//         setSending(false);
//     };

//     const groups = skills.reduce((acc, s) => {
//         acc[s.category] = acc[s.category] || [];
//         acc[s.category].push(s);
//         return acc;
//     }, {});

//     const CATEGORY_ORDER = ['Frontend', 'Backend', 'Database', 'Tools'];
//     const orderedCategories = [
//         ...CATEGORY_ORDER.filter(c => groups[c]),
//         ...Object.keys(groups).filter(c => !CATEGORY_ORDER.includes(c)),
//     ];

//     const TECH_LOGOS = {
//         'react': <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="3.5" fill="#61DAFB" /><ellipse cx="20" cy="20" rx="17" ry="6.5" stroke="#61DAFB" strokeWidth="1.8" fill="none" /><ellipse cx="20" cy="20" rx="17" ry="6.5" stroke="#61DAFB" strokeWidth="1.8" fill="none" transform="rotate(60 20 20)" /><ellipse cx="20" cy="20" rx="17" ry="6.5" stroke="#61DAFB" strokeWidth="1.8" fill="none" transform="rotate(120 20 20)" /></svg>,
//         'javascript': <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><rect width="40" height="40" rx="4" fill="#F7DF1E" /><text x="6" y="31" fontFamily="Arial" fontWeight="bold" fontSize="22" fill="#000">JS</text></svg>,
//         'html': <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><polygon points="4,4 8,36 20,39 32,36 36,4" fill="#E34F26" /><text x="9" y="27" fontFamily="Arial" fontWeight="bold" fontSize="10" fill="#fff">HTML</text></svg>,
//         'css': <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><polygon points="4,4 8,36 20,39 32,36 36,4" fill="#1572B6" /><text x="10" y="27" fontFamily="Arial" fontWeight="bold" fontSize="10" fill="#fff">CSS</text></svg>,
//         'tailwind css': <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M20 8c-4.4 0-7.2 2.2-8.4 6.6 1.7-2.2 3.6-3 5.9-2.4 1.3.3 2.2 1.3 3.2 2.4 1.6 1.7 3.5 3.6 7.6 3.6 4.4 0 7.2-2.2 8.4-6.6-1.7 2.2-3.6 3-5.9 2.4-1.3-.3-2.2-1.3-3.2-2.4C26 9.9 24.1 8 20 8zm-8.4 9.8C7.2 17.8 4.4 20 3.2 24.4c1.7-2.2 3.6-3 5.9-2.4 1.3.3 2.2 1.3 3.2 2.4 1.6 1.7 3.5 3.6 7.6 3.6 4.4 0 7.2-2.2 8.4-6.6-1.7 2.2-3.6 3-5.9 2.4-1.3-.3-2.2-1.3-3.2-2.4-1.6-1.7-3.5-3.6-7.6-3.6z" fill="#06B6D4" /></svg>,
//         'node.js': <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M20 3L4 12.5v15L20 37l16-9.5v-15L20 3z" fill="#339933" /><text x="10" y="25" fontFamily="Arial" fontWeight="bold" fontSize="8" fill="#fff">NODE</text></svg>,
//         'express.js': <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><rect width="40" height="40" rx="4" fill="#353535" /><text x="4" y="25" fontFamily="Arial" fontWeight="bold" fontSize="9" fill="#fff">expr</text></svg>,
//         'mongodb': <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M20 3c0 0-8 14-8 21a8 8 0 0016 0C28 17 20 3 20 3z" fill="#47A248" /></svg>,
//         'mongoose': <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M20 3c0 0-8 14-8 21a8 8 0 0016 0C28 17 20 3 20 3z" fill="#47A248" /><path d="M20 3v32" stroke="#fff" strokeWidth="1.5" opacity="0.5" /><text x="8" y="38" fontFamily="Arial" fontWeight="bold" fontSize="7" fill="#47A248">ose</text></svg>,
//         'rest api': <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><rect width="40" height="40" rx="6" fill="#FF6B35" /><text x="4" y="17" fontFamily="Arial" fontWeight="bold" fontSize="9" fill="#fff">REST</text><text x="6" y="29" fontFamily="Arial" fontWeight="bold" fontSize="9" fill="#fff">API</text></svg>,
//         'git': <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><rect width="40" height="40" rx="6" fill="#F05032" /><path d="M36.5 18.3L21.7 3.5a2.4 2.4 0 00-3.4 0l-3.4 3.4 4.3 4.3a2.9 2.9 0 013.6 3.6l4.1 4.1a2.9 2.9 0 11-1.7 1.7l-3.8-3.8v10a2.9 2.9 0 11-2.4 0V16.3a2.9 2.9 0 01-1.6-3.8L13.2 8.2 3.5 17.9a2.4 2.4 0 000 3.4l14.8 14.8a2.4 2.4 0 003.4 0l14.8-14.8a2.4 2.4 0 000-3.4z" fill="#fff" /></svg>,
//         'github': <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="19" fill="#24292E" /><path fillRule="evenodd" clipRule="evenodd" d="M20 6a14 14 0 00-4.43 27.28c.7.13.96-.3.96-.67v-2.35c-3.9.85-4.72-1.88-4.72-1.88a3.7 3.7 0 00-1.56-2.05c-1.28-.87.1-.85.1-.85a2.94 2.94 0 012.14 1.44 2.98 2.98 0 004.07 1.16 2.98 2.98 0 01.89-1.87c-3.11-.35-6.38-1.56-6.38-6.93a5.42 5.42 0 011.44-3.77 5.04 5.04 0 01.14-3.72s1.18-.38 3.85 1.43a13.27 13.27 0 017 0c2.68-1.81 3.85-1.43 3.85-1.43a5.04 5.04 0 01.14 3.72 5.41 5.41 0 011.44 3.77c0 5.38-3.28 6.57-6.4 6.92a3.34 3.34 0 01.95 2.59v3.84c0 .37.25.8.96.67A14 14 0 0020 6z" fill="#fff" /></svg>,
//         'vs code': <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M29.5 4l-14 13L8 11 4 13.5l9 6.5-9 6.5L8 29l7.5-6 14 13L36 34V6l-6.5-2z" fill="#007ACC" /></svg>,
//         'vite': <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M36 6L20.5 34 18 29l11-23z" fill="#BD34FE" /><path d="M4 6l16 28L5 14z" fill="#41D1FF" /></svg>,
//         'npm': <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><rect width="40" height="40" rx="4" fill="#CB3837" /><rect x="8" y="12" width="24" height="16" fill="#fff" /><rect x="14" y="18" width="6" height="10" fill="#CB3837" /></svg>,
//         'postman': <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="18" fill="#FF6C37" /><path d="M22 15l-7 7 3 3 7-7-3-3z" fill="#fff" opacity="0.9" /><circle cx="24" cy="16" r="2" fill="#fff" /></svg>,
//         'figma': <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="4" width="10" height="10" rx="5" fill="#F24E1E" /><rect x="20" y="4" width="10" height="10" rx="5" fill="#FF7262" /><rect x="10" y="14" width="10" height="10" fill="#A259FF" /><rect x="10" y="24" width="10" height="10" rx="5" fill="#0ACF83" /><circle cx="25" cy="19" r="5" fill="#1ABCFE" /></svg>,
//         'vercel': <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><rect width="40" height="40" rx="6" fill="#000" /><polygon points="20,8 36,32 4,32" fill="#fff" /></svg>,
//         'figma': <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="4" width="10" height="10" rx="5" fill="#F24E1E" /><rect x="20" y="4" width="10" height="10" rx="5" fill="#FF7262" /><rect x="10" y="14" width="10" height="10" fill="#A259FF" /><rect x="10" y="24" width="10" height="10" rx="5" fill="#0ACF83" /><circle cx="25" cy="19" r="5" fill="#1ABCFE" /></svg>,
//     };

//     return (
//         <div className="portfolio">

//             {/* HERO */}
//             <section className="hero" id="hero">
//                 <div className="container hero-inner">
//                     <div className="hero-text">
//                         <p className="hero-greeting">👋 Welcome to my portfolio</p>
//                         <h1 className="hero-name">{about.name || 'Your Name'}<span className="hero-name-dot">.</span></h1>
//                         <h2 className="hero-title">{about.title || 'Full Stack Developer'}</h2>
//                         <p className="hero-bio">{about.bio || 'Add your bio from admin panel.'}</p>
//                         <div className="hero-btns">
//                             <a href="/projects" className="btn btn-primary">My Projects ↗</a>
//                             {about.resumeUrl && (
//                                 <a href={about.resumeUrl} target="_blank" rel="noreferrer" className="btn btn-outline">
//                                     ↓ Download CV
//                                 </a>
//                             )}
//                         </div>
//                         <div className="hero-socials">
//                             {about.github && (
//                                 <a href={about.github} target="_blank" rel="noreferrer" className="social-icon" title="GitHub">
//                                     <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" /></svg>
//                                 </a>
//                             )}
//                             {about.linkedin && (
//                                 <a href={about.linkedin} target="_blank" rel="noreferrer" className="social-icon" title="LinkedIn">
//                                     <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
//                                 </a>
//                             )}
//                             {about.email && (
//                                 <a href={`mailto:${about.email}`} className="social-icon" title="Email">
//                                     <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
//                                 </a>
//                             )}
//                         </div>

//                         <div className="hero-stats">
//                             <div className="stat-item">
//                                 <span className="stat-num">2+</span>
//                                 <span className="stat-label">Years Experience</span>
//                             </div>
//                             <div className="stat-item">
//                                 <span className="stat-num">{projects.length}+</span>
//                                 <span className="stat-label">Projects Done</span>
//                             </div>
//                             <div className="stat-item">
//                                 <span className="stat-num">100%</span>
//                                 <span className="stat-label">Client Satisfaction</span>
//                             </div>
//                         </div>
//                     </div>

//                     <div className="hero-img-wrap">
//                         <div className="hero-img-frame">
//                             {about.avatar
//                                 ? <img src={about.avatar} alt={about.name} className="hero-img" />
//                                 : <div className="hero-img-placeholder">📷<p style={{ fontSize: '0.85rem' }}>Add photo from admin</p></div>
//                             }
//                         </div>
//                         <div className="hero-img-badge">
//                             <span className="badge-icon">⭐</span>
//                             <div>
//                                 <div className="badge-num">Top Rated</div>
//                                 <div className="badge-text">Developer</div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </section>

//             {/* ABOUT */}
//             <section id="about" style={{ background: 'var(--bg2)' }}>
//                 <div className="container">
//                     <div className="about-grid">
//                         <div className="about-img-wrap">
//                             {about.avatar
//                                 ? <img src={about.aboutImage || about.avatar} alt={about.name} className="about-img" />
//                                 : <div className="about-img-placeholder">👤</div>
//                             }
//                         </div>
//                         <div className="about-content">
//                             <h2><span>About</span> Me</h2>
//                             <p className="about-bio" style={{ textAlign: 'justify' }}>{about.bio || 'Add your bio from admin panel.'}</p>
//                             <div className="about-info">
//                                 {about.location && <div className="info-item"><span>📍</span><span>{about.location}</span></div>}
//                                 {about.email && <div className="info-item"><span>📧</span><span>{about.email}</span></div>}
//                                 {about.phone && <div className="info-item"><span>📱</span><span>{about.phone}</span></div>}
//                             </div>
//                             <div className="about-btns">
//                                 <a href="/contact" className="btn btn-primary">Let's Talk ↗</a>
//                                 {about.resumeUrl && (
//                                     <a href={about.resumeUrl} target="_blank" rel="noreferrer" className="btn btn-outline">↓ Portfolio</a>
//                                 )}
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </section>

//             {/* PROJECTS */}
//             <section id="projects">
//                 <div className="container">
//                     <h2 className="section-title">My <span style={{ color: 'var(--gold)' }}>Projects</span></h2>
//                     <p className="section-sub">Things I've built with passion</p>
//                     <div className="projects-grid">
//                         {projects.length === 0 && <p className="muted">No projects yet. Add from admin panel.</p>}
//                         {projects.map(p => (
//                             <div key={p._id} className="card project-card">
//                                 {p.image ? <img src={p.image} alt={p.title} className="project-img" /> : <div className="project-img-placeholder">🖼️</div>}
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
//             <section id="skills" style={{ background: 'var(--bg2)' }}>
//                 <div className="container">
//                     <h2 className="section-title">My <span style={{ color: 'var(--gold)' }}>Skills</span></h2>
//                     <p className="section-sub">Technologies I work with</p>
//                     {skills.length === 0 && <p className="muted">No skills yet. Add from admin panel.</p>}
//                     {orderedCategories.map(cat => {
//                         const items = groups[cat];
//                         return (
//                             <div key={cat} className="skill-group">
//                                 <h3 className="skill-cat-label">{cat.toUpperCase()}</h3>
//                                 <div className="skills-grid-pro">
//                                     {items.map(s => {
//                                         const logo = TECH_LOGOS[s.name?.toLowerCase()];
//                                         const level = s.level;
//                                         const badge = level >= 90 ? { label: 'Expert', cls: 'badge-expert' }
//                                             : level >= 80 ? { label: 'Advanced', cls: 'badge-advanced' }
//                                                 : level >= 70 ? { label: 'Proficient', cls: 'badge-proficient' }
//                                                     : { label: 'Intermediate', cls: 'badge-intermediate' };
//                                         return (
//                                             <div key={s._id} className="skill-card-pro">
//                                                 <div className="skill-logo-wrap">
//                                                     {logo
//                                                         ? <div className="skill-svg-wrap">{logo}</div>
//                                                         : <span className="skill-fallback-icon">{s.icon || '🔧'}</span>
//                                                     }
//                                                 </div>
//                                                 <span className="skill-name-pro">{s.name}</span>
//                                                 <span className={`skill-badge ${badge.cls}`}>{badge.label}</span>
//                                             </div>
//                                         );
//                                     })}
//                                 </div>
//                             </div>
//                         );
//                     })}
//                 </div>
//             </section>

//             {/* EXPERIENCE */}
//             <section id="experience">
//                 <div className="container">
//                     <h2 className="section-title">My <span style={{ color: 'var(--gold)' }}>Experience</span></h2>
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
//             <section id="contact" style={{ background: 'var(--bg2)' }}>
//                 <div className="container">
//                     <h2 className="section-title">Get In <span style={{ color: 'var(--gold)' }}>Touch</span></h2>
//                     <p className="section-sub">Let's work together!</p>
//                     {sent ? (
//                         <div className="sent-box card">✅ Message sent! I'll get back to you soon.</div>
//                     ) : (
//                         <form className="contact-form card" onSubmit={sendMsg}>
//                             <div className="form-row">
//                                 <input placeholder="Your Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
//                                 <input placeholder="Your Email" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
//                             </div>
//                             <input placeholder="Subject" value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} />
//                             <textarea rows="5" placeholder="Your Message..." value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} required />
//                             <button type="submit" className="btn btn-primary" disabled={sending}>
//                                 {sending ? 'Sending...' : 'Send Message ↗'}
//                             </button>
//                         </form>
//                     )}
//                 </div>
//             </section>

//             {/* FOOTER */}
//             <Footer />
//         </div>
//     );
// }
import React, { useEffect, useState } from 'react';
import API from '../api';
import './Portfolio.css';
import Footer from '../components/Footer';

export default function Portfolio() {
    const [about, setAbout] = useState({});
    const [projects, setProjects] = useState([]);
    const [skills, setSkills] = useState([]);
    const [experience, setExp] = useState([]);
    const [certificates, setCertificates] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);
    const [selectedCert, setSelectedCert] = useState(null);
    const [selectedBlog, setSelectedBlog] = useState(null);

    useEffect(() => {
        API.get('/about').then(r => setAbout(r.data));
        API.get('/projects').then(r => setProjects(r.data));
        API.get('/skills').then(r => setSkills(r.data));
        API.get('/experience').then(r => setExp(r.data));
        API.get('/certificates').then(r => setCertificates(r.data));
        API.get('/blogs').then(r => setBlogs(r.data));
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

    const CATEGORY_ORDER = ['Frontend', 'Backend', 'Database', 'Tools'];
    const orderedCategories = [
        ...CATEGORY_ORDER.filter(c => groups[c]),
        ...Object.keys(groups).filter(c => !CATEGORY_ORDER.includes(c)),
    ];

    const TECH_LOGOS = {
        'react': <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="3.5" fill="#61DAFB" /><ellipse cx="20" cy="20" rx="17" ry="6.5" stroke="#61DAFB" strokeWidth="1.8" fill="none" /><ellipse cx="20" cy="20" rx="17" ry="6.5" stroke="#61DAFB" strokeWidth="1.8" fill="none" transform="rotate(60 20 20)" /><ellipse cx="20" cy="20" rx="17" ry="6.5" stroke="#61DAFB" strokeWidth="1.8" fill="none" transform="rotate(120 20 20)" /></svg>,
        'javascript': <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><rect width="40" height="40" rx="4" fill="#F7DF1E" /><text x="6" y="31" fontFamily="Arial" fontWeight="bold" fontSize="22" fill="#000">JS</text></svg>,
        'html': <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><polygon points="4,4 8,36 20,39 32,36 36,4" fill="#E34F26" /><text x="9" y="27" fontFamily="Arial" fontWeight="bold" fontSize="10" fill="#fff">HTML</text></svg>,
        'css': <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><polygon points="4,4 8,36 20,39 32,36 36,4" fill="#1572B6" /><text x="10" y="27" fontFamily="Arial" fontWeight="bold" fontSize="10" fill="#fff">CSS</text></svg>,
        'tailwind css': <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M20 8c-4.4 0-7.2 2.2-8.4 6.6 1.7-2.2 3.6-3 5.9-2.4 1.3.3 2.2 1.3 3.2 2.4 1.6 1.7 3.5 3.6 7.6 3.6 4.4 0 7.2-2.2 8.4-6.6-1.7 2.2-3.6 3-5.9 2.4-1.3-.3-2.2-1.3-3.2-2.4C26 9.9 24.1 8 20 8zm-8.4 9.8C7.2 17.8 4.4 20 3.2 24.4c1.7-2.2 3.6-3 5.9-2.4 1.3.3 2.2 1.3 3.2 2.4 1.6 1.7 3.5 3.6 7.6 3.6 4.4 0 7.2-2.2 8.4-6.6-1.7 2.2-3.6 3-5.9 2.4-1.3-.3-2.2-1.3-3.2-2.4-1.6-1.7-3.5-3.6-7.6-3.6z" fill="#06B6D4" /></svg>,
        'node.js': <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M20 3L4 12.5v15L20 37l16-9.5v-15L20 3z" fill="#339933" /><text x="10" y="25" fontFamily="Arial" fontWeight="bold" fontSize="8" fill="#fff">NODE</text></svg>,
        'express.js': <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><rect width="40" height="40" rx="4" fill="#353535" /><text x="4" y="25" fontFamily="Arial" fontWeight="bold" fontSize="9" fill="#fff">expr</text></svg>,
        'mongodb': <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M20 3c0 0-8 14-8 21a8 8 0 0016 0C28 17 20 3 20 3z" fill="#47A248" /></svg>,
        'mongoose': <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M20 3c0 0-8 14-8 21a8 8 0 0016 0C28 17 20 3 20 3z" fill="#47A248" /><path d="M20 3v32" stroke="#fff" strokeWidth="1.5" opacity="0.5" /><text x="8" y="38" fontFamily="Arial" fontWeight="bold" fontSize="7" fill="#47A248">ose</text></svg>,
        'rest api': <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><rect width="40" height="40" rx="6" fill="#FF6B35" /><text x="4" y="17" fontFamily="Arial" fontWeight="bold" fontSize="9" fill="#fff">REST</text><text x="6" y="29" fontFamily="Arial" fontWeight="bold" fontSize="9" fill="#fff">API</text></svg>,
        'git': <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><rect width="40" height="40" rx="6" fill="#F05032" /><path d="M36.5 18.3L21.7 3.5a2.4 2.4 0 00-3.4 0l-3.4 3.4 4.3 4.3a2.9 2.9 0 013.6 3.6l4.1 4.1a2.9 2.9 0 11-1.7 1.7l-3.8-3.8v10a2.9 2.9 0 11-2.4 0V16.3a2.9 2.9 0 01-1.6-3.8L13.2 8.2 3.5 17.9a2.4 2.4 0 000 3.4l14.8 14.8a2.4 2.4 0 003.4 0l14.8-14.8a2.4 2.4 0 000-3.4z" fill="#fff" /></svg>,
        'github': <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="19" fill="#24292E" /><path fillRule="evenodd" clipRule="evenodd" d="M20 6a14 14 0 00-4.43 27.28c.7.13.96-.3.96-.67v-2.35c-3.9.85-4.72-1.88-4.72-1.88a3.7 3.7 0 00-1.56-2.05c-1.28-.87.1-.85.1-.85a2.94 2.94 0 012.14 1.44 2.98 2.98 0 004.07 1.16 2.98 2.98 0 01.89-1.87c-3.11-.35-6.38-1.56-6.38-6.93a5.42 5.42 0 011.44-3.77 5.04 5.04 0 01.14-3.72s1.18-.38 3.85 1.43a13.27 13.27 0 017 0c2.68-1.81 3.85-1.43 3.85-1.43a5.04 5.04 0 01.14 3.72 5.41 5.41 0 011.44 3.77c0 5.38-3.28 6.57-6.4 6.92a3.34 3.34 0 01.95 2.59v3.84c0 .37.25.8.96.67A14 14 0 0020 6z" fill="#fff" /></svg>,
        'vs code': <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M29.5 4l-14 13L8 11 4 13.5l9 6.5-9 6.5L8 29l7.5-6 14 13L36 34V6l-6.5-2z" fill="#007ACC" /></svg>,
        'vite': <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><path d="M36 6L20.5 34 18 29l11-23z" fill="#BD34FE" /><path d="M4 6l16 28L5 14z" fill="#41D1FF" /></svg>,
        'npm': <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><rect width="40" height="40" rx="4" fill="#CB3837" /><rect x="8" y="12" width="24" height="16" fill="#fff" /><rect x="14" y="18" width="6" height="10" fill="#CB3837" /></svg>,
        'postman': <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="18" fill="#FF6C37" /><path d="M22 15l-7 7 3 3 7-7-3-3z" fill="#fff" opacity="0.9" /><circle cx="24" cy="16" r="2" fill="#fff" /></svg>,
        'figma': <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="4" width="10" height="10" rx="5" fill="#F24E1E" /><rect x="20" y="4" width="10" height="10" rx="5" fill="#FF7262" /><rect x="10" y="14" width="10" height="10" fill="#A259FF" /><rect x="10" y="24" width="10" height="10" rx="5" fill="#0ACF83" /><circle cx="25" cy="19" r="5" fill="#1ABCFE" /></svg>,
        'vercel': <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><rect width="40" height="40" rx="6" fill="#000" /><polygon points="20,8 36,32 4,32" fill="#fff" /></svg>,
    };

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
                                ? <img src={about.aboutImage || about.avatar} alt={about.name} className="about-img" />
                                : <div className="about-img-placeholder">👤</div>
                            }
                        </div>
                        <div className="about-content">
                            <h2><span>About</span> Me</h2>
                            <p className="about-bio" style={{ textAlign: 'justify' }}>{about.bio || 'Add your bio from admin panel.'}</p>
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
                    {orderedCategories.map(cat => {
                        const items = groups[cat];
                        return (
                            <div key={cat} className="skill-group">
                                <h3 className="skill-cat-label">{cat.toUpperCase()}</h3>
                                <div className="skills-grid-pro">
                                    {items.map(s => {
                                        const logo = TECH_LOGOS[s.name?.toLowerCase()];
                                        const level = s.level;
                                        const badge = level >= 90 ? { label: 'Expert', cls: 'badge-expert' }
                                            : level >= 80 ? { label: 'Advanced', cls: 'badge-advanced' }
                                                : level >= 70 ? { label: 'Proficient', cls: 'badge-proficient' }
                                                    : { label: 'Intermediate', cls: 'badge-intermediate' };
                                        return (
                                            <div key={s._id} className="skill-card-pro">
                                                <div className="skill-logo-wrap">
                                                    {logo
                                                        ? <div className="skill-svg-wrap">{logo}</div>
                                                        : <span className="skill-fallback-icon">{s.icon || '🔧'}</span>
                                                    }
                                                </div>
                                                <span className="skill-name-pro">{s.name}</span>
                                                <span className={`skill-badge ${badge.cls}`}>{badge.label}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
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

            {/* CERTIFICATES */}
            <section id="certificates" style={{ background: 'var(--bg2)' }}>
                <div className="container">
                    <h2 className="section-title">My <span style={{ color: 'var(--gold)' }}>Certificates</span></h2>
                    <p className="section-sub">Courses & certifications I've completed</p>
                    <div className="projects-grid">
                        {certificates.length === 0 && <p className="muted">No certificates yet. Add from admin panel.</p>}
                        {certificates.map(c => (
                            <div key={c._id} className="card project-card" style={{ cursor: 'pointer' }} onClick={() => setSelectedCert(c)}>
                                {c.image
                                    ? <img src={c.image} alt={c.title} className="cert-img" />
                                    : <div className="project-img-placeholder">🏆</div>
                                }
                                <div className="project-body">
                                    <h3>{c.title}</h3>
                                    <p className="muted">{c.issuer}</p>
                                    {c.date && <p className="muted" style={{ fontSize: '0.85rem', marginTop: '0.3rem' }}>📅 {c.date}</p>}
                                    <div className="tags">
                                        {c.tags?.map(t => <span key={t} className="tag">{t}</span>)}
                                    </div>
                                    {c.credentialUrl && (
                                        <a
                                            href={c.credentialUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="cert-verify"
                                            onClick={e => e.stopPropagation()}
                                        >
                                            Verify Certificate ↗
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CERTIFICATE MODAL */}
            {selectedCert && (
                <div className="cert-modal-overlay" onClick={() => setSelectedCert(null)}>
                    <div className="cert-modal" onClick={e => e.stopPropagation()}>
                        <button className="cert-modal-close" onClick={() => setSelectedCert(null)}>✕</button>
                        {selectedCert.image && (
                            <img src={selectedCert.image} alt={selectedCert.title} className="cert-modal-img" />
                        )}
                        <div className="cert-modal-info">
                            <h3>{selectedCert.title}</h3>
                            <p>{selectedCert.issuer}</p>
                            {selectedCert.date && <p>📅 {selectedCert.date}</p>}
                            {selectedCert.credentialUrl && (
                                <a
                                    href={selectedCert.credentialUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="btn btn-primary"
                                    style={{ marginTop: '0.75rem', width: 'fit-content' }}
                                >
                                    Verify Certificate ↗
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* BLOGS */}
            <section id="blogs">
                <div className="container">
                    <h2 className="section-title">My <span style={{ color: 'var(--gold)' }}>Blogs</span></h2>
                    <p className="section-sub">Thoughts, tutorials & insights</p>
                    <div className="blogs-grid">
                        {blogs.length === 0 && <p className="muted">No blogs yet. Add from admin panel.</p>}
                        {blogs.map(b => (
                            <div key={b._id} className="blog-card">
                                <div className="blog-img-wrap">
                                    {b.thumbnail
                                        ? <img src={b.thumbnail} alt={b.title} className="blog-img" />
                                        : <div className="blog-img-placeholder">📝</div>
                                    }
                                </div>
                                <div className="blog-body">
                                    <div className="blog-tags">
                                        {b.tags?.map(t => <span key={t} className="blog-tag">{t}</span>)}
                                    </div>
                                    <h3 className="blog-title">{b.title}</h3>
                                    <p className="blog-excerpt">{b.content?.slice(0, 150)}</p>
                                    <button className="blog-read-more" onClick={() => setSelectedBlog(b)}>
                                        Read More →
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* BLOG MODAL */}
            {selectedBlog && (
                <div className="blog-modal-overlay" onClick={() => setSelectedBlog(null)}>
                    <div className="blog-modal" onClick={e => e.stopPropagation()}>
                        <button className="blog-modal-close" onClick={() => setSelectedBlog(null)}>✕</button>
                        {selectedBlog.image && (
                            <img src={selectedBlog.image} alt={selectedBlog.title} className="blog-modal-img" />
                        )}
                        <div className="blog-modal-body">
                            <div className="blog-tags" style={{ marginBottom: '1rem' }}>
                                {selectedBlog.tags?.map(t => <span key={t} className="blog-tag">{t}</span>)}
                            </div>
                            <h2 className="blog-modal-title">{selectedBlog.title}</h2>
                            <p className="blog-modal-content">{selectedBlog.content}</p>
                        </div>
                    </div>
                </div>
            )}

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
            <Footer />
        </div>
    );
}