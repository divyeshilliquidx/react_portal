const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

/* Send Email */
router.post('/', (req, res) => {

  const requestData = req.body;
  //  console.log(requestData);
  const content = requestData.body_with_html;
  const subject = requestData.subject;
  const email = requestData.email;
  // Create a transporter for sending emails via SMTP
  const transporter = nodemailer.createTransport({
    host: 'smtp.sendgrid.net',
    port: 587,
    secure: false, // Set to true for TLS
    auth: {
      user: 'apikey', // Your SendGrid API key
      pass: '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' // Your SendGrid API key password or app password
    }
  });

  // Define the email content
  const mailOptions = {
    from: 'admin@cloudforexcrm.com',
    to: email,
    subject: subject,
    html: content,
    //text: content,
    //cc: 'cc1@example.com, cc2@example.com',
    //bcc: 'bcc1@example.com, bcc2@example.com'
  };

  // Send the email
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return res.status(500).json({ error: 'Error sending email:' });
    }
    res.status(200).json({ message: 'Email sent:', details: info });
  });
});

module.exports = router;
