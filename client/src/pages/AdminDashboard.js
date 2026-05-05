import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';
import './AdminDashboard.css';

const TABS = ['About', 'Projects', 'Skills', 'Experience', 'Messages'];

export default function AdminDashboard() {
    const navigate = useNavigate();
    const [tab, setTab] = useState('About');
    const [about, setAbout] = useState({});
    const [projects, setProjects] = useState([]);
    const [skills, setSkills] = useState([]);
    const [exp, setExp] = useState([]);
    const [messages, setMsgs] = useState([]);
    const [editing, setEditing] = useState(null);
    const [replyId, setReplyId] = useState(null);
    const [replyText, setReplyText] = useState('');

    const [projForm, setProjForm] = useState({ title: '', description: '', image: '', liveUrl: '', githubUrl: '', tags: '', featured: false });
    const [skillForm, setSkillForm] = useState({ name: '', icon: '', category: 'Frontend', level: 80 });
    const [expForm, setExpForm] = useState({ company: '', position: '', startDate: '', endDate: '', current: false, description: '' });

    const logout = () => { localStorage.removeItem('adminToken'); navigate('/admin/login'); };

    const load = useCallback(async () => {
        try {
            const [a, p, s, e, m] = await Promise.all([
                API.get('/about'), API.get('/projects'), API.get('/skills'),
                API.get('/experience'), API.get('/contact')
            ]);
            setAbout(a.data); setProjects(p.data); setSkills(s.data); setExp(e.data); setMsgs(m.data);
        } catch { navigate('/admin/login'); }
    }, [navigate]);

    useEffect(() => { load(); }, [load]);

    const saveAbout = async e => { e.preventDefault(); await API.put('/about', about); alert('✅ Saved!'); };

    const saveProject = async e => {
        e.preventDefault();
        const data = { ...projForm, tags: projForm.tags.split(',').map(t => t.trim()).filter(Boolean) };
        editing ? await API.put(`/projects/${editing}`, data) : await API.post('/projects', data);
        setProjForm({ title: '', description: '', image: '', liveUrl: '', githubUrl: '', tags: '', featured: false });
        setEditing(null); load();
    };

    const saveSkill = async e => {
        e.preventDefault();
        editing ? await API.put(`/skills/${editing}`, skillForm) : await API.post('/skills', skillForm);
        setSkillForm({ name: '', icon: '', category: 'Frontend', level: 80 });
        setEditing(null); load();
    };

    const saveExp = async e => {
        e.preventDefault();
        editing ? await API.put(`/experience/${editing}`, expForm) : await API.post('/experience', expForm);
        setExpForm({ company: '', position: '', startDate: '', endDate: '', current: false, description: '' });
        setEditing(null); load();
    };

    const sendReply = async id => {
        try {
            await API.post(`/contact/${id}/reply`, { replyText });
            alert('✅ Reply sent!');
            setReplyId(null); setReplyText(''); load();
        } catch { alert('❌ Failed to send reply'); }
    };

    const del = async (url) => { if (window.confirm('Delete?')) { await API.delete(url); load(); } };

    return (
        <div className="admin">
            <nav className="admin-nav">
                <span className="admin-logo">⚡ Admin Panel</span>
                <div className="admin-tabs">
                    {TABS.map(t => (
                        <button key={t} className={`tab-btn ${tab === t ? 'active' : ''}`}
                            onClick={() => { setTab(t); setEditing(null); }}>
                            {t}
                            {t === 'Messages' && messages.filter(m => !m.read).length > 0 &&
                                <span className="badge">{messages.filter(m => !m.read).length}</span>}
                        </button>
                    ))}
                </div>
                <div className="nav-right">
                    <a href="/" target="_blank" className="btn btn-outline" style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }}>View Site ↗</a>
                    <button className="btn btn-outline" onClick={logout} style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }}>Logout</button>
                </div>
            </nav>

            <div className="admin-body">

                {/* ABOUT */}
                {tab === 'About' && (
                    <form className="admin-form card" onSubmit={saveAbout}>
                        <h3>✏️ Edit About Info</h3>
                        <div className="form-row">
                            <label>Full Name<input value={about.name || ''} onChange={e => setAbout({ ...about, name: e.target.value })} placeholder="Md. Sakib Chowdhury" /></label>
                            <label>Title / Role<input value={about.title || ''} onChange={e => setAbout({ ...about, title: e.target.value })} placeholder="Full Stack Developer" /></label>
                        </div>
                        <label>Bio<textarea rows="4" value={about.bio || ''} onChange={e => setAbout({ ...about, bio: e.target.value })} placeholder="Write about yourself..." /></label>
                        <div className="form-row">
                            <label>Email<input value={about.email || ''} onChange={e => setAbout({ ...about, email: e.target.value })} /></label>
                            <label>Phone<input value={about.phone || ''} onChange={e => setAbout({ ...about, phone: e.target.value })} /></label>
                        </div>
                        <div className="form-row">
                            <label>Location<input value={about.location || ''} onChange={e => setAbout({ ...about, location: e.target.value })} /></label>
                            <label>Photo URL (avatar)<input value={about.avatar || ''} onChange={e => setAbout({ ...about, avatar: e.target.value })} placeholder="https://..." /></label>
                        </div>
                        <div className="form-row">
                            <label>GitHub URL<input value={about.github || ''} onChange={e => setAbout({ ...about, github: e.target.value })} /></label>
                            <label>LinkedIn URL<input value={about.linkedin || ''} onChange={e => setAbout({ ...about, linkedin: e.target.value })} /></label>
                        </div>
                        <label>Resume URL<input value={about.resumeUrl || ''} onChange={e => setAbout({ ...about, resumeUrl: e.target.value })} /></label>
                        <button type="submit" className="btn btn-primary">Save Changes ✨</button>
                    </form>
                )}

                {/* PROJECTS */}
                {tab === 'Projects' && (
                    <>
                        <form className="admin-form card" onSubmit={saveProject}>
                            <h3>{editing ? '✏️ Edit Project' : '➕ Add Project'}</h3>
                            <div className="form-row">
                                <label>Title<input value={projForm.title} onChange={e => setProjForm({ ...projForm, title: e.target.value })} required /></label>
                                <label>Image URL<input value={projForm.image} onChange={e => setProjForm({ ...projForm, image: e.target.value })} placeholder="https://..." /></label>
                            </div>
                            <label>Description<textarea rows="3" value={projForm.description} onChange={e => setProjForm({ ...projForm, description: e.target.value })} required /></label>
                            <div className="form-row">
                                <label>Live URL<input value={projForm.liveUrl} onChange={e => setProjForm({ ...projForm, liveUrl: e.target.value })} /></label>
                                <label>GitHub URL<input value={projForm.githubUrl} onChange={e => setProjForm({ ...projForm, githubUrl: e.target.value })} /></label>
                            </div>
                            <label>Tags (comma separated)<input value={projForm.tags} onChange={e => setProjForm({ ...projForm, tags: e.target.value })} placeholder="React, Node.js, MongoDB" /></label>
                            <div className="check-row">
                                <input type="checkbox" id="feat" checked={projForm.featured} onChange={e => setProjForm({ ...projForm, featured: e.target.checked })} />
                                <label htmlFor="feat">Featured project</label>
                            </div>
                            <div className="form-actions">
                                <button type="submit" className="btn btn-primary">{editing ? 'Update' : 'Add Project'}</button>
                                {editing && <button type="button" className="btn btn-outline" onClick={() => { setEditing(null); setProjForm({ title: '', description: '', image: '', liveUrl: '', githubUrl: '', tags: '', featured: false }); }}>Cancel</button>}
                            </div>
                        </form>
                        <div className="items-list">
                            {projects.map(p => (
                                <div key={p._id} className="list-item card">
                                    <div className="item-info">
                                        {p.image && <img src={p.image} alt={p.title} className="item-thumb" />}
                                        <div>
                                            <strong>{p.title}</strong>
                                            <p className="muted">{p.description?.slice(0, 80)}...</p>
                                            <div className="tags">{p.tags?.map(t => <span key={t} className="tag">{t}</span>)}</div>
                                        </div>
                                    </div>
                                    <div className="item-actions">
                                        <button className="btn btn-outline" onClick={() => { setProjForm({ ...p, tags: (p.tags || []).join(', ') }); setEditing(p._id); }}>Edit</button>
                                        <button className="btn-danger" onClick={() => del(`/projects/${p._id}`)}>Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {/* SKILLS */}
                {tab === 'Skills' && (
                    <>
                        <form className="admin-form card" onSubmit={saveSkill}>
                            <h3>{editing ? '✏️ Edit Skill' : '➕ Add Skill'}</h3>
                            <div className="form-row">
                                <label>Name<input value={skillForm.name} onChange={e => setSkillForm({ ...skillForm, name: e.target.value })} required /></label>
                                <label>Icon (emoji)<input value={skillForm.icon} onChange={e => setSkillForm({ ...skillForm, icon: e.target.value })} placeholder="⚛️" /></label>
                            </div>
                            <div className="form-row">
                                <label>Category
                                    <select value={skillForm.category} onChange={e => setSkillForm({ ...skillForm, category: e.target.value })}>
                                        <option>Frontend</option><option>Backend</option><option>Database</option><option>Tools</option><option>Other</option>
                                    </select>
                                </label>
                                <label>Level: {skillForm.level}%
                                    <input type="range" min="0" max="100" value={skillForm.level} onChange={e => setSkillForm({ ...skillForm, level: +e.target.value })} style={{ padding: 0, border: 'none', background: 'transparent' }} />
                                </label>
                            </div>
                            <div className="form-actions">
                                <button type="submit" className="btn btn-primary">{editing ? 'Update' : 'Add Skill'}</button>
                                {editing && <button type="button" className="btn btn-outline" onClick={() => { setEditing(null); setSkillForm({ name: '', icon: '', category: 'Frontend', level: 80 }); }}>Cancel</button>}
                            </div>
                        </form>
                        <div className="items-list">
                            {skills.map(s => (
                                <div key={s._id} className="list-item card">
                                    <div className="item-info">
                                        <span style={{ fontSize: '1.8rem' }}>{s.icon}</span>
                                        <div><strong>{s.name}</strong><p className="muted">{s.category} — {s.level}%</p></div>
                                    </div>
                                    <div className="item-actions">
                                        <button className="btn btn-outline" onClick={() => { setSkillForm(s); setEditing(s._id); }}>Edit</button>
                                        <button className="btn-danger" onClick={() => del(`/skills/${s._id}`)}>Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {/* EXPERIENCE */}
                {tab === 'Experience' && (
                    <>
                        <form className="admin-form card" onSubmit={saveExp}>
                            <h3>{editing ? '✏️ Edit Experience' : '➕ Add Experience'}</h3>
                            <div className="form-row">
                                <label>Company<input value={expForm.company} onChange={e => setExpForm({ ...expForm, company: e.target.value })} required /></label>
                                <label>Position<input value={expForm.position} onChange={e => setExpForm({ ...expForm, position: e.target.value })} required /></label>
                            </div>
                            <div className="form-row">
                                <label>Start Date<input value={expForm.startDate} onChange={e => setExpForm({ ...expForm, startDate: e.target.value })} placeholder="Jan 2022" required /></label>
                                <label>End Date<input value={expForm.endDate} onChange={e => setExpForm({ ...expForm, endDate: e.target.value })} placeholder="Dec 2023" disabled={expForm.current} /></label>
                            </div>
                            <div className="check-row">
                                <input type="checkbox" id="curr" checked={expForm.current} onChange={e => setExpForm({ ...expForm, current: e.target.checked })} />
                                <label htmlFor="curr">Currently working here</label>
                            </div>
                            <label>Description<textarea rows="3" value={expForm.description} onChange={e => setExpForm({ ...expForm, description: e.target.value })} /></label>
                            <div className="form-actions">
                                <button type="submit" className="btn btn-primary">{editing ? 'Update' : 'Add Experience'}</button>
                                {editing && <button type="button" className="btn btn-outline" onClick={() => { setEditing(null); setExpForm({ company: '', position: '', startDate: '', endDate: '', current: false, description: '' }); }}>Cancel</button>}
                            </div>
                        </form>
                        <div className="items-list">
                            {exp.map(x => (
                                <div key={x._id} className="list-item card">
                                    <div><strong>{x.position}</strong> <span className="muted">@ {x.company}</span><p className="muted">{x.startDate} — {x.current ? 'Present' : x.endDate}</p></div>
                                    <div className="item-actions">
                                        <button className="btn btn-outline" onClick={() => { setExpForm(x); setEditing(x._id); }}>Edit</button>
                                        <button className="btn-danger" onClick={() => del(`/experience/${x._id}`)}>Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {/* MESSAGES */}
                {tab === 'Messages' && (
                    <div className="items-list">
                        {messages.length === 0 && <p className="muted">No messages yet.</p>}
                        {messages.map(m => (
                            <div key={m._id} className={`card msg-card ${!m.read ? 'unread' : ''}`}>
                                <div className="msg-header">
                                    <div>
                                        <strong>{m.name}</strong>
                                        <span className="muted"> — {m.email}</span>
                                        {!m.read && <span className="new-badge">NEW</span>}
                                        {m.replied && <span className="replied-badge">REPLIED</span>}
                                    </div>
                                    <span className="muted" style={{ fontSize: '0.8rem' }}>{new Date(m.createdAt).toLocaleDateString()}</span>
                                </div>
                                {m.subject && <p className="msg-subject">📌 {m.subject}</p>}
                                <p className="muted" style={{ marginBottom: '1rem' }}>{m.message}</p>

                                {replyId === m._id ? (
                                    <div className="reply-box">
                                        <textarea rows="4" placeholder="Write your reply..." value={replyText} onChange={e => setReplyText(e.target.value)} />
                                        <div className="form-actions">
                                            <button className="btn btn-primary" onClick={() => sendReply(m._id)}>Send Reply 📧</button>
                                            <button className="btn btn-outline" onClick={() => setReplyId(null)}>Cancel</button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="item-actions">
                                        <button className="btn btn-primary" onClick={() => { setReplyId(m._id); setReplyText(''); }}>Reply 📧</button>
                                        {!m.read && <button className="btn btn-outline" onClick={async () => { await API.put(`/contact/${m._id}/read`); load(); }}>Mark Read</button>}
                                        <button className="btn-danger" onClick={() => del(`/contact/${m._id}`)}>Delete</button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}

            </div>
        </div>
    );
}