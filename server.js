// server.js
require('dotenv').config();

const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;
const nodemailer = require('nodemailer');

app.use('/hepcocp_2024_12', express.static(path.join(__dirname, 'hepcocp_2024_12')));

app.get('/', (req, res) => {
  fs.readFile('hepcocp_2024_12/index.html', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
      return;
    }
    const username = process.env.USERNAME || 'defaultUsername';
    const password = process.env.PASSWORD || 'defaultPassword';
    let result = data.replace('process.env.USERNAME', `'${username}'`);
    result = result.replace('process.env.PASSWORD', `'${password}'`);
    res.send(result);
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});


app.post('/send-email', (req, res) => {
  const htmlFilePath = path.join(__dirname, 'cf', 'index.html');
  fs.readFile(htmlFilePath, 'utf8', (err, htmlContent) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error reading HTML file');
      return;
    }

    // SMTP 設定
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    let mailOptions = {
      from: '"Sender Name" chang-allen@togatta.co.jp',
      to: 'chang-allen@togatta.co.jp',
      subject: 'Test Email',
      text: 'Hello World!',
      html: htmlContent,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
      res.status(200).send('Email sent!');
    });
  });
});
