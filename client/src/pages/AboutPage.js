// import React, { useEffect, useState } from 'react';
// import API from '../api';
// import './Portfolio.css';

// export default function AboutPage() {
//     const [about, setAbout] = useState({});
//     useEffect(() => { API.get('/about').then(r => setAbout(r.data)); }, []);

//     return (
//         <div className="portfolio">
//             <section id="about" style={{ paddingTop: '100px' }}>
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
//         </div>
//     );
// }
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
                    <h2 className="section-title">About <span>Me</span></h2>
                    <p className="section-sub">Get to know me better</p>
                    <div className="about-grid">
                        <div className="card about-card" style={{
                            background: 'linear-gradient(135deg, #161616 0%, #1a1608 50%, #161616 100%)',
                            border: '1px solid rgba(201, 168, 76, 0.35)',
                            borderRadius: '16px',
                            padding: '2.5rem',
                            boxShadow: '0 8px 32px rgba(201, 168, 76, 0.08), 0 2px 8px rgba(0,0,0,0.4)',
                            position: 'relative',
                            overflow: 'hidden',
                        }}>
                            {/* Subtle gold glow top-left corner */}
                            <div style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '200px',
                                height: '200px',
                                background: 'radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 70%)',
                                pointerEvents: 'none',
                            }} />

                            <p className="about-bio" style={{
                                color: '#cccccc',
                                lineHeight: '1.9',
                                fontSize: '0.97rem',
                                marginBottom: '1.8rem',
                                position: 'relative',
                            }}>
                                {about.bio || 'Add your bio from admin panel.'}
                            </p>

                            <div className="about-info" style={{ position: 'relative' }}>
                                {about.location && (
                                    <div className="info-item" style={{
                                        background: 'rgba(201, 168, 76, 0.06)',
                                        border: '1px solid rgba(201, 168, 76, 0.15)',
                                        borderRadius: '8px',
                                        padding: '0.6rem 1rem',
                                    }}>
                                        <span>📍</span>
                                        <span style={{ color: '#cccccc' }}>{about.location}</span>
                                    </div>
                                )}
                                {about.email && (
                                    <div className="info-item" style={{
                                        background: 'rgba(201, 168, 76, 0.06)',
                                        border: '1px solid rgba(201, 168, 76, 0.15)',
                                        borderRadius: '8px',
                                        padding: '0.6rem 1rem',
                                    }}>
                                        <span>📧</span>
                                        <span style={{ color: '#cccccc' }}>{about.email}</span>
                                    </div>
                                )}
                                {about.phone && (
                                    <div className="info-item" style={{
                                        background: 'rgba(201, 168, 76, 0.06)',
                                        border: '1px solid rgba(201, 168, 76, 0.15)',
                                        borderRadius: '8px',
                                        padding: '0.6rem 1rem',
                                    }}>
                                        <span>📱</span>
                                        <span style={{ color: '#cccccc' }}>{about.phone}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}