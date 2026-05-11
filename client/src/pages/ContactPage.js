import React, { useState } from 'react';
import API from '../api';
import './Portfolio.css';

export default function ContactPage() {
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);

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

    return (
        <div className="portfolio">
            <section id="contact" style={{ paddingTop: '100px' }}>
                <div className="container">
                    <h2 className="section-title">Contact</h2>
                    <p className="section-sub">Let's work together!</p>
                    {sent
                        ? <div className="sent-box card">✅ Message sent!</div>
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
                        )}
                </div>
            </section>
        </div>
    );
}