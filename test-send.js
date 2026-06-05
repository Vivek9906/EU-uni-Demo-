require('dotenv').config({ path: '.env' });
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.hostinger.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

async function testMail() {
  try {
    const res = await transporter.sendMail({
      from: process.env.EMAIL_FROM || 'noreply@euamericanuniversity.us',
      to: 'test-recipient@example.com',
      subject: 'Thank You for Subscribing | EU American University',
      html: '<h1>Test</h1>'
    });
    console.log("Success:", res);
  } catch (error) {
    console.error("Error sending mail:", error);
  }
}

testMail();
