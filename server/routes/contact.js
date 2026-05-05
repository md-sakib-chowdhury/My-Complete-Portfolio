const router = require('express').Router();
const nodemailer = require('nodemailer');
const Message = require('../models/Message');
const auth = require('../middleware/auth');

const mailer = () => nodemailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
});

router.post('/', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        const msg = await Message.create({ name, email, subject, message });
        await mailer().sendMail({
            from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,
            subject: `📩 New Message from ${name}: ${subject || 'No Subject'}`,
            html: `
        <div style="font-family:sans-serif;max-width:500px">
          <h2 style="color:#7c3aed">New Portfolio Message</h2>
          <p><b>Name:</b> ${name}</p>
          <p><b>Email:</b> <a href="mailto:${email}">${email}</a></p>
          <p><b>Subject:</b> ${subject || '-'}</p>
          <hr/>
          <p><b>Message:</b></p>
          <p>${message}</p>
        </div>
      `
        });
        res.json({ message: 'Sent!', id: msg._id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed' });
    }
});

router.get('/', auth, async (req, res) => {
    try { res.json(await Message.find().sort({ createdAt: -1 })); }
    catch (err) { res.status(500).json({ message: err.message }); }
});

router.put('/:id/read', auth, async (req, res) => {
    try { res.json(await Message.findByIdAndUpdate(req.params.id, { read: true }, { new: true })); }
    catch (err) { res.status(500).json({ message: err.message }); }
});

router.post('/:id/reply', auth, async (req, res) => {
    try {
        const msg = await Message.findById(req.params.id);
        if (!msg) return res.status(404).json({ message: 'Not found' });
        await mailer().sendMail({
            from: `"Portfolio" <${process.env.EMAIL_USER}>`,
            to: msg.email,
            subject: `Re: ${msg.subject || 'Your message'}`,
            html: `
        <div style="font-family:sans-serif;max-width:500px">
          <p>Hi ${msg.name},</p>
          <div style="white-space:pre-wrap">${req.body.replyText}</div>
          <hr/>
          <p style="color:#888;font-size:12px"><b>Your original message:</b><br/>${msg.message}</p>
        </div>
      `
        });
        await Message.findByIdAndUpdate(req.params.id, { read: true, replied: true });
        res.json({ message: 'Reply sent!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed' });
    }
});

router.delete('/:id', auth, async (req, res) => {
    try { await Message.findByIdAndDelete(req.params.id); res.json({ message: 'Deleted' }); }
    catch (err) { res.status(500).json({ message: err.message }); }
});

module.exports = router;