// // import React, { useEffect, useState } from 'react';
// // import API from '../api';
// // import './Portfolio.css';

// // export default function CertificatesPage() {
// //     const [certs, setCerts] = useState([]);

// //     useEffect(() => { API.get('/certificates').then(r => setCerts(r.data)); }, []);

// //     return (
// //         <div className="portfolio">
// //             <section style={{ paddingTop: '100px' }}>
// //                 <div className="container">
// //                     <h2 className="section-title">Certificates</h2>
// //                     <p className="section-sub">My professional certifications & achievements</p>
// //                     {certs.length === 0 && <p className="muted">No certificates yet.</p>}
// //                     <div className="projects-grid">
// //                         {certs.map(c => (
// //                             <div key={c._id} className="card project-card">
// //                                 {c.image
// //                                     ? <img src={c.image} alt={c.title} className="project-img" />
// //                                     : <div className="project-img-placeholder">🏅</div>
// //                                 }
// //                                 <div className="project-body">
// //                                     <h3>{c.title}</h3>
// //                                     <p className="muted">🏢 {c.issuer}</p>
// //                                     <p className="muted">📅 {c.date}</p>
// //                                     {c.link && (
// //                                         <a href={c.link} target="_blank" rel="noreferrer" className="btn btn-outline" style={{ marginTop: '1rem' }}>
// //                                             🔗 Verify Certificate
// //                                         </a>
// //                                     )}
// //                                 </div>
// //                             </div>
// //                         ))}
// //                     </div>
// //                 </div>
// //             </section>
// //         </div>
// //     );
// // }
// import React, { useEffect, useState } from 'react';
// import API from '../api';
// import './Portfolio.css';
// import Footer from '../components/Footer';

// export default function CertificatesPage() {
//     const [certs, setCerts] = useState([]);

//     useEffect(() => { API.get('/certificates').then(r => setCerts(r.data)); }, []);

//     return (
//         <div className="portfolio">
//             <section style={{ paddingTop: '100px' }}>
//                 <div className="container">
//                     <h2 className="section-title">Certi<span>ficates</span></h2>
//                     <p className="section-sub">My professional certifications & achievements</p>
//                     {certs.length === 0 && <p className="muted">No certificates yet.</p>}
//                     <div className="projects-grid">
//                         {certs.map(c => (
//                             <div key={c._id} className="card project-card">
//                                 {c.image
//                                     ? <img src={c.image} alt={c.title} className="project-img" />
//                                     : <div className="project-img-placeholder">🏅</div>
//                                 }
//                                 <div className="project-body">
//                                     <h3>{c.title}</h3>
//                                     <p className="muted">🏢 {c.issuer}</p>
//                                     <p className="muted">📅 {c.date}</p>
//                                     {c.link && (
//                                         <a href={c.link} target="_blank" rel="noreferrer" className="btn btn-outline" style={{ marginTop: '1rem' }}>
//                                             🔗 Verify Certificate
//                                         </a>
//                                     )}
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
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

export default function CertificatesPage() {
    const [certs, setCerts] = useState([]);
    const [selected, setSelected] = useState(null);

    useEffect(() => { API.get('/certificates').then(r => setCerts(r.data)); }, []);

    return (
        <div className="portfolio">
            <section style={{ paddingTop: '100px' }}>
                <div className="container">
                    <h2 className="section-title">Certi<span>ficates</span></h2>
                    <p className="section-sub">My professional certifications & achievements</p>
                    {certs.length === 0 && <p className="muted">No certificates yet.</p>}
                    <div className="projects-grid">
                        {certs.map(c => (
                            <div
                                key={c._id}
                                className="card project-card"
                                onClick={() => c.image && setSelected(c)}
                                style={{ cursor: c.image ? 'pointer' : 'default' }}
                            >
                                {c.image
                                    ? <img src={c.image} alt={c.title} className="cert-img" />
                                    : <div className="project-img-placeholder">🏅</div>
                                }
                                <div className="project-body">
                                    <h3>{c.title}</h3>
                                    <p className="muted">🏢 {c.issuer}</p>
                                    <p className="muted">📅 {c.date}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── CERTIFICATE MODAL ─── */}
            {selected && (
                <div className="cert-modal-overlay" onClick={() => setSelected(null)}>
                    <div className="cert-modal" onClick={e => e.stopPropagation()}>
                        <button className="cert-modal-close" onClick={() => setSelected(null)}>✕</button>
                        <img src={selected.image} alt={selected.title} className="cert-modal-img" />
                        <div className="cert-modal-info">
                            <h3>{selected.title}</h3>
                            <p>🏢 {selected.issuer}</p>
                            <p>📅 {selected.date}</p>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
}