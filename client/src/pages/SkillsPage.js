// // import React, { useEffect, useState } from 'react';
// // import API from '../api';
// // import './Portfolio.css';

// // export default function SkillsPage() {
// //     const [skills, setSkills] = useState([]);
// //     useEffect(() => { API.get('/skills').then(r => setSkills(r.data)); }, []);

// //     const groups = skills.reduce((acc, s) => {
// //         acc[s.category] = acc[s.category] || [];
// //         acc[s.category].push(s);
// //         return acc;
// //     }, {});

// //     return (
// //         <div className="portfolio">
// //             <section id="skills" style={{ paddingTop: '100px' }}>
// //                 <div className="container">
// //                     <h2 className="section-title">Skills</h2>
// //                     <p className="section-sub">Technologies I work with</p>
// //                     {skills.length === 0 && <p className="muted">No skills yet.</p>}
// //                     {Object.entries(groups).map(([cat, items]) => (
// //                         <div key={cat} className="skill-group">
// //                             <h3 className="skill-cat">{cat}</h3>
// //                             <div className="skills-grid">
// //                                 {items.map(s => (
// //                                     <div key={s._id} className="card skill-card">
// //                                         <span className="skill-icon">{s.icon}</span>
// //                                         <span className="skill-name">{s.name}</span>
// //                                         <div className="skill-bar-wrap">
// //                                             <div className="skill-bar" style={{ width: `${s.level}%` }} />
// //                                         </div>
// //                                         <span className="skill-level">{s.level}%</span>
// //                                     </div>
// //                                 ))}
// //                             </div>
// //                         </div>
// //                     ))}
// //                 </div>
// //             </section>
// //         </div>
// //     );
// // }
// import React, { useEffect, useState } from 'react';
// import API from '../api';
// import './Portfolio.css';
// import Footer from '../components/Footer';

// export default function SkillsPage() {
//     const [skills, setSkills] = useState([]);
//     useEffect(() => { API.get('/skills').then(r => setSkills(r.data)); }, []);

//     const groups = skills.reduce((acc, s) => {
//         acc[s.category] = acc[s.category] || [];
//         acc[s.category].push(s);
//         return acc;
//     }, {});

//     return (
//         <div className="portfolio">
//             <section id="skills" style={{ paddingTop: '100px' }}>
//                 <div className="container">
//                     <h2 className="section-title">Ski<span>lls</span></h2>
//                     <p className="section-sub">Technologies I work with</p>
//                     {skills.length === 0 && <p className="muted">No skills yet.</p>}
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

//             <Footer />
//         </div>
//     );
// }
import React, { useEffect, useState } from 'react';
import API from '../api';
import './Portfolio.css';
import Footer from '../components/Footer';

const TECH_LOGOS = {
    'react': (
        <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="3.5" fill="#61DAFB" />
            <ellipse cx="20" cy="20" rx="17" ry="6.5" stroke="#61DAFB" strokeWidth="1.8" fill="none" />
            <ellipse cx="20" cy="20" rx="17" ry="6.5" stroke="#61DAFB" strokeWidth="1.8" fill="none" transform="rotate(60 20 20)" />
            <ellipse cx="20" cy="20" rx="17" ry="6.5" stroke="#61DAFB" strokeWidth="1.8" fill="none" transform="rotate(120 20 20)" />
        </svg>
    ),
    'javascript': (
        <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="40" rx="4" fill="#F7DF1E" />
            <text x="6" y="31" fontFamily="Arial" fontWeight="bold" fontSize="22" fill="#000">JS</text>
        </svg>
    ),
    'html': (
        <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            <polygon points="4,4 8,36 20,39 32,36 36,4" fill="#E34F26" />
            <polygon points="20,36.5 20,7.5 33,7.5 30.5,33.5" fill="#EF652A" />
            <polygon points="20,36.5 10,33.5 8,12 20,12" fill="#fff" />
            <polygon points="20,12 32,12 30.5,27 20,30" fill="#fff" opacity="0.9" />
            <polygon points="20,30 12,27.5 11,20 20,20" fill="#EBEBEB" />
            <polygon points="20,20 29,20 28.2,27 20,30" fill="#fff" />
        </svg>
    ),
    'css': (
        <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            <polygon points="4,4 8,36 20,39 32,36 36,4" fill="#1572B6" />
            <polygon points="20,36.5 20,7.5 33,7.5 30.5,33.5" fill="#33A9DC" />
            <text x="10" y="26" fontFamily="Arial" fontWeight="bold" fontSize="10" fill="#fff">CSS</text>
        </svg>
    ),
    'tailwind css': (
        <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 8c-4.4 0-7.2 2.2-8.4 6.6 1.7-2.2 3.6-3 5.9-2.4 1.3.3 2.2 1.3 3.2 2.4 1.6 1.7 3.5 3.6 7.6 3.6 4.4 0 7.2-2.2 8.4-6.6-1.7 2.2-3.6 3-5.9 2.4-1.3-.3-2.2-1.3-3.2-2.4C26 9.9 24.1 8 20 8zm-8.4 9.8C7.2 17.8 4.4 20 3.2 24.4c1.7-2.2 3.6-3 5.9-2.4 1.3.3 2.2 1.3 3.2 2.4 1.6 1.7 3.5 3.6 7.6 3.6 4.4 0 7.2-2.2 8.4-6.6-1.7 2.2-3.6 3-5.9 2.4-1.3-.3-2.2-1.3-3.2-2.4-1.6-1.7-3.5-3.6-7.6-3.6z" fill="#06B6D4" />
        </svg>
    ),
    'node.js': (
        <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 3L4 12.5v15L20 37l16-9.5v-15L20 3z" fill="#339933" />
            <text x="10" y="25" fontFamily="Arial" fontWeight="bold" fontSize="8" fill="#fff">NODE</text>
        </svg>
    ),
    'express.js': (
        <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="40" rx="4" fill="#353535" />
            <text x="4" y="25" fontFamily="Arial" fontWeight="bold" fontSize="9" fill="#fff">expr</text>
        </svg>
    ),
    'mongodb': (
        <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 3c0 0-8 14-8 21a8 8 0 0016 0C28 17 20 3 20 3z" fill="#47A248" />
            <path d="M20 3v32" stroke="#fff" strokeWidth="1.5" opacity="0.4" />
        </svg>
    ),
    'git': (
        <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="40" rx="6" fill="#F05032" />
            <path d="M36.5 18.3L21.7 3.5a2.4 2.4 0 00-3.4 0l-3.4 3.4 4.3 4.3a2.9 2.9 0 013.6 3.6l4.1 4.1a2.9 2.9 0 11-1.7 1.7l-3.8-3.8v10a2.9 2.9 0 11-2.4 0V16.3a2.9 2.9 0 01-1.6-3.8L13.2 8.2 3.5 17.9a2.4 2.4 0 000 3.4l14.8 14.8a2.4 2.4 0 003.4 0l14.8-14.8a2.4 2.4 0 000-3.4z" fill="#fff" />
        </svg>
    ),
    'github': (
        <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="19" fill="#24292E" />
            <path fillRule="evenodd" clipRule="evenodd" d="M20 6a14 14 0 00-4.43 27.28c.7.13.96-.3.96-.67v-2.35c-3.9.85-4.72-1.88-4.72-1.88a3.7 3.7 0 00-1.56-2.05c-1.28-.87.1-.85.1-.85a2.94 2.94 0 012.14 1.44 2.98 2.98 0 004.07 1.16 2.98 2.98 0 01.89-1.87c-3.11-.35-6.38-1.56-6.38-6.93a5.42 5.42 0 011.44-3.77 5.04 5.04 0 01.14-3.72s1.18-.38 3.85 1.43a13.27 13.27 0 017 0c2.68-1.81 3.85-1.43 3.85-1.43a5.04 5.04 0 01.14 3.72 5.41 5.41 0 011.44 3.77c0 5.38-3.28 6.57-6.4 6.92a3.34 3.34 0 01.95 2.59v3.84c0 .37.25.8.96.67A14 14 0 0020 6z" fill="#fff" />
        </svg>
    ),
    'vs code': (
        <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            <path d="M29.5 4l-14 13L8 11 4 13.5l9 6.5-9 6.5L8 29l7.5-6 14 13L36 34V6l-6.5-2z" fill="#007ACC" />
            <path d="M29.5 4L15.5 17 8 11 4 13.5l9 6.5-9 6.5L8 29l7.5-6 14 13L36 34V6l-6.5-2zM30 12.5v15L20.5 20 30 12.5z" fill="#fff" opacity="0.3" />
        </svg>
    ),
    'figma': (
        <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="4" width="10" height="10" rx="5" fill="#F24E1E" />
            <rect x="20" y="4" width="10" height="10" rx="5" fill="#FF7262" />
            <rect x="10" y="14" width="10" height="10" rx="0" fill="#A259FF" />
            <rect x="10" y="24" width="10" height="10" rx="5" fill="#0ACF83" />
            <circle cx="25" cy="19" r="5" fill="#1ABCFE" />
        </svg>
    ),
    'postman': (
        <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="18" fill="#FF6C37" />
            <path d="M22 15l-7 7 3 3 7-7-3-3z" fill="#fff" opacity="0.9" />
            <circle cx="24" cy="16" r="2" fill="#fff" />
        </svg>
    ),
    'vercel': (
        <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="40" rx="6" fill="#000" />
            <polygon points="20,8 36,32 4,32" fill="#fff" />
        </svg>
    ),
    'vite': (
        <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            <path d="M36 6L20.5 34 18 29l11-23z" fill="#BD34FE" />
            <path d="M4 6l16 28L5 14z" fill="#41D1FF" />
        </svg>
    ),
};

function getLevelLabel(level) {
    if (level >= 90) return { label: 'Expert', cls: 'badge-expert' };
    if (level >= 80) return { label: 'Advanced', cls: 'badge-advanced' };
    if (level >= 70) return { label: 'Proficient', cls: 'badge-proficient' };
    return { label: 'Intermediate', cls: 'badge-intermediate' };
}

function getLogo(name) {
    return TECH_LOGOS[name?.toLowerCase()] || null;
}

const CATEGORY_ORDER = ['Frontend', 'Backend', 'Database', 'Tools'];

export default function SkillsPage() {
    const [skills, setSkills] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        API.get('/skills').then(r => {
            setSkills(r.data);
            setLoaded(true);
        });
    }, []);

    const groups = skills.reduce((acc, s) => {
        acc[s.category] = acc[s.category] || [];
        acc[s.category].push(s);
        return acc;
    }, {});

    const orderedCategories = [
        ...CATEGORY_ORDER.filter(c => groups[c]),
        ...Object.keys(groups).filter(c => !CATEGORY_ORDER.includes(c)),
    ];

    return (
        <div className="portfolio">
            <section id="skills" className="skills-section">
                <div className="container">
                    <h2 className="section-title">Ski<span>lls</span></h2>
                    <p className="section-sub">Technologies I work with</p>

                    {loaded && skills.length === 0 && (
                        <p className="muted">No skills yet.</p>
                    )}

                    {orderedCategories.map(cat => (
                        <div key={cat} className="skill-group">
                            <h3 className="skill-cat-label">{cat.toUpperCase()}</h3>
                            <div className="skills-grid-pro">
                                {groups[cat].map(s => {
                                    const { label, cls } = getLevelLabel(s.level);
                                    const logo = getLogo(s.name);
                                    return (
                                        <div key={s._id} className="skill-card-pro">
                                            <div className="skill-logo-wrap">
                                                {logo
                                                    ? <div className="skill-svg-wrap">{logo}</div>
                                                    : <span className="skill-fallback-icon">{s.icon || '🔧'}</span>
                                                }
                                            </div>
                                            <span className="skill-name-pro">{s.name}</span>
                                            <span className={`skill-badge ${cls}`}>{label}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            <Footer />
        </div>
    );
}