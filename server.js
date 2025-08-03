const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Serve main HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle form POST
app.post('/send-email', (req, res) => {
    const { name, email, phone, subject, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'portfoliocontact88@gmail.com', // Your email address
            pass: 'lsqy urux mzdl ntsn' // App password
        }
    });

    const mailOptions = {
        from: email,
        to: 'sana.ullah01889@gmail.com',
        subject: subject,
        text: `
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        Message: ${message}
        `
    };

    transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log('Error:', error);  // eita add koro
        res.status(500).send('Error sending email');
    } else {
        console.log('Email sent: ' + info.response);
        res.send('Success! Your message has been sent.');
    }
});

});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
