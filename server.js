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

    const attachments = [
      {
        filename: '24doxho_LP-messageR_ol_01.gif',
        path: path.join(__dirname, 'cf', '24doxho_LP-messageR_ol_01.gif'),
        cid: 'image1@id',
      },
      {
        filename: '24doxho_LP-messageR_ol_02.gif',
        path: path.join(__dirname, 'cf', '24doxho_LP-messageR_ol_02.gif'),
        cid: 'image2@id',
      },
      {
        filename: '24doxho_LP-messageR_ol_03.gif',
        path: path.join(__dirname, 'cf', '24doxho_LP-messageR_ol_03.gif'),
        cid: 'image3@id',
      },
      {
        filename: '24doxho_LP-messageR_ol_04.gif',
        path: path.join(__dirname, 'cf', '24doxho_LP-messageR_ol_04.gif'),
        cid: 'image4@id',
      },
      {
        filename: '24doxho_LP-messageR_ol_05.gif',
        path: path.join(__dirname, 'cf', '24doxho_LP-messageR_ol_05.gif'),
        cid: 'image5@id',
      },
      {
        filename: '24doxho_LP-messageR_ol_06.gif',
        path: path.join(__dirname, 'cf', '24doxho_LP-messageR_ol_06.gif'),
        cid: 'image6@id',
      },
      {
        filename: '24doxho_LP-messageR_ol_07.gif',
        path: path.join(__dirname, 'cf', '24doxho_LP-messageR_ol_07.gif'),
        cid: 'image7@id',
      },
      {
        filename: '24doxho_LP-messageR_ol_08.gif',
        path: path.join(__dirname, 'cf', '24doxho_LP-messageR_ol_08.gif'),
        cid: 'image8@id',
      },
      {
        filename: '24doxho_LP-messageR_ol_09.gif',
        path: path.join(__dirname, 'cf', '24doxho_LP-messageR_ol_09.gif'),
        cid: 'image9@id',
      },
      {
        filename: '24doxho_LP-messageR_ol_10.gif',
        path: path.join(__dirname, 'cf', '24doxho_LP-messageR_ol_10.gif'),
        cid: 'image10@id',
      },
      {
        filename: '24doxho_LP-messageR_ol_11.gif',
        path: path.join(__dirname, 'cf', '24doxho_LP-messageR_ol_11.gif'),
        cid: 'image11@id',
      },
      {
        filename: '24doxho_LP-messageR_ol_12.gif',
        path: path.join(__dirname, 'cf', '24doxho_LP-messageR_ol_12.gif'),
        cid: 'image12@id',
      },
      {
        filename: '24doxho_LP-messageR_ol_13.gif',
        path: path.join(__dirname, 'cf', '24doxho_LP-messageR_ol_13.gif'),
        cid: 'image13@id',
      },
      {
        filename: '24doxho_LP-messageR_ol_14.gif',
        path: path.join(__dirname, 'cf', '24doxho_LP-messageR_ol_14.gif'),
        cid: 'image14@id',
      },
      {
        filename: '24doxho_LP-messageR_ol_15.gif',
        path: path.join(__dirname, 'cf', '24doxho_LP-messageR_ol_15.gif'),
        cid: 'image15@id',
      },
      {
        filename: '24doxho_LP-messageR_ol_16.gif',
        path: path.join(__dirname, 'cf', '24doxho_LP-messageR_ol_16.gif'),
        cid: 'image16@id',
      },
      {
        filename: '24doxho_LP-messageR_ol_17.gif',
        path: path.join(__dirname, 'cf', '24doxho_LP-messageR_ol_17.gif'),
        cid: 'image17@id',
      },
      {
        filename: '24doxho_LP-messageR_ol_18.gif',
        path: path.join(__dirname, 'cf', '24doxho_LP-messageR_ol_18.gif'),
        cid: 'image18@id',
      },
      {
        filename: '24doxho_LP-messageR_ol_19.gif',
        path: path.join(__dirname, 'cf', '24doxho_LP-messageR_ol_19.gif'),
        cid: 'image19@id',
      },
    ];

    let mailOptions = {
      from: '"Sender Name" chang-allen@togatta.co.jp',
      to: 'kamo-ysmt@togatta.co.jp',
      subject: 'docomo Test Email',
      html: htmlContent,
      attachments: attachments
    };

    console.log(mailOptions.attachments);

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
      res.status(200).send('Email sent!');
    });
  });
});
