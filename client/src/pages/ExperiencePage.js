// // import React, { useEffect, useState } from 'react';
// // import API from '../api';
// // import './Portfolio.css';

// // export default function ExperiencePage() {
// //     const [experience, setExp] = useState([]);
// //     useEffect(() => { API.get('/experience').then(r => setExp(r.data)); }, []);

// //     return (
// //         <div className="portfolio">
// //             <section id="experience" style={{ paddingTop: '100px' }}>
// //                 <div className="container">
// //                     <h2 className="section-title">Experience</h2>
// //                     <p className="section-sub">My professional journey</p>
// //                     <div className="timeline">
// //                         {experience.length === 0 && <p className="muted">No experience yet.</p>}
// //                         {experience.map((e, i) => (
// //                             <div key={e._id} className="tl-item">
// //                                 <div className="tl-dot" />
// //                                 {i < experience.length - 1 && <div className="tl-line" />}
// //                                 <div className="card tl-card">
// //                                     <h3>{e.position}</h3>
// //                                     <p className="tl-company">🏢 {e.company}</p>
// //                                     <p className="tl-date">📅 {e.startDate} — {e.current ? 'Present' : e.endDate}</p>
// //                                     <p className="muted">{e.description}</p>
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

// export default function ExperiencePage() {
//     const [experience, setExp] = useState([]);
//     useEffect(() => { API.get('/experience').then(r => setExp(r.data)); }, []);

//     return (
//         <div className="portfolio">
//             <section id="experience" style={{ paddingTop: '100px' }}>
//                 <div className="container">
//                     <h2 className="section-title">Experi<span>ence</span></h2>
//                     <p className="section-sub">My professional journey</p>
//                     <div className="timeline">
//                         {experience.length === 0 && <p className="muted">No experience yet.</p>}
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

//             <Footer />
//         </div>
//     );
// }
import React, { useEffect, useState } from 'react';
import API from '../api';
import './Portfolio.css';
import Footer from '../components/Footer';

export default function ExperiencePage() {
    const [experience, setExp] = useState([]);
    useEffect(() => { API.get('/experience').then(r => setExp(r.data)); }, []);

    return (
        <div className="portfolio">
            <section id="experience" style={{ paddingTop: '100px' }}>
                <div className="container">
                    <h2 className="section-title">Experi<span>ence</span></h2>
                    <p className="section-sub">My professional journey</p>
                    <div className="timeline">
                        {experience.length === 0 && <p className="muted">No experience yet.</p>}
                        {experience.map((e, i) => (
                            <div key={e._id} className="tl-item">
                                <div className="tl-dot" />
                                {i < experience.length - 1 && <div className="tl-line" />}
                                <div className="tl-card-new">
                                    <div className="tl-card-header">
                                        <div className="tl-card-left">
                                            <span className="tl-badge">{e.current ? '🟢 Current' : '✅ Completed'}</span>
                                            <h3 className="tl-position">{e.position}</h3>
                                            <p className="tl-company-new">🏢 {e.company}</p>
                                        </div>
                                        <div className="tl-date-box">
                                            <span className="tl-date-new">📅 {e.startDate}</span>
                                            <span className="tl-date-arrow">→</span>
                                            <span className="tl-date-new">{e.current ? 'Present' : e.endDate}</span>
                                        </div>
                                    </div>
                                    <div className="tl-divider" />
                                    <p className="tl-desc">{e.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}