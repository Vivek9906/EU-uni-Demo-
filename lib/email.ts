import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const emailHeader = `
<div style="background: #1A3C6E; padding: 24px; text-align: center;">
  <h1 style="color: #FFFFFF; font-family: 'Merriweather', Georgia, serif; margin: 0; font-size: 24px;">
    American Management University
  </h1>
  <p style="color: #B8860B; font-family: 'Source Sans 3', Arial, sans-serif; margin: 4px 0 0; font-size: 14px;">
    A leader's choice in education
  </p>
</div>
`;

const emailFooter = `
<div style="background: #F7F8FA; padding: 24px; text-align: center; border-top: 1px solid #E2E8F0;">
  <p style="color: #718096; font-family: 'Source Sans 3', Arial, sans-serif; font-size: 13px; margin: 0;">
    © ${new Date().getFullYear()} American Management University. All rights reserved.
  </p>
  <p style="color: #718096; font-family: 'Source Sans 3', Arial, sans-serif; font-size: 13px; margin: 8px 0 0;">
    11 rue Magdebourg, Paris, France 75016
  </p>
</div>
`;

function wrapEmail(content: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background: #F7F8FA; font-family: 'Source Sans 3', Arial, sans-serif;">
  <div style="max-width: 600px; margin: 0 auto; background: #FFFFFF;">
    ${emailHeader}
    <div style="padding: 32px 24px;">
      ${content}
    </div>
    ${emailFooter}
  </div>
</body>
</html>
  `.trim();
}

export async function sendApplicationConfirmation(
  to: string,
  name: string,
  referenceNumber: string,
  programName: string
): Promise<void> {
  const content = `
    <h2 style="color: #1A1A2E; font-family: 'Merriweather', Georgia, serif; font-size: 20px;">
      Application Received
    </h2>
    <p style="color: #4A5568; line-height: 1.7;">
      Dear ${name},
    </p>
    <p style="color: #4A5568; line-height: 1.7;">
      Thank you for submitting your application to American Management University. We have received your application and it is currently being reviewed by our admissions team.
    </p>
    <div style="background: #F7F8FA; border: 1px solid #E2E8F0; border-radius: 8px; padding: 20px; margin: 24px 0;">
      <p style="color: #718096; font-size: 13px; margin: 0 0 4px; text-transform: uppercase; letter-spacing: 1px;">
        Application Reference Number
      </p>
      <p style="color: #1A3C6E; font-size: 24px; font-weight: bold; margin: 0;">
        ${referenceNumber}
      </p>
      <p style="color: #718096; font-size: 14px; margin: 8px 0 0;">
        Program: ${programName}
      </p>
    </div>
    <p style="color: #4A5568; line-height: 1.7;">
      Please save your reference number for future correspondence. You will be notified via email when there is an update on your application status.
    </p>
    <p style="color: #4A5568; line-height: 1.7;">
      If you have any questions, please don't hesitate to contact us at 
      <a href="mailto:admissions@amu.edu.eu" style="color: #1A3C6E;">admissions@amu.edu.eu</a>.
    </p>
    <p style="color: #4A5568; line-height: 1.7;">
      Best regards,<br>
      <strong>AMU Admissions Office</strong>
    </p>
  `;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || 'noreply@amu.edu.eu',
      to,
      subject: `Application Received — ${referenceNumber} | AMU`,
      html: wrapEmail(content),
    });
  } catch (error) {
    console.error('Failed to send application confirmation email:', error);
  }
}

export async function sendStatusUpdateEmail(
  to: string,
  name: string,
  referenceNumber: string,
  status: string,
  programName: string
): Promise<void> {
  const statusMessages: Record<string, string> = {
    reviewing: 'Your application is now being reviewed by our academic committee.',
    accepted: 'Congratulations! Your application has been accepted. Welcome to American Management University!',
    rejected: 'After careful review, we regret to inform you that your application has not been successful at this time.',
  };

  const content = `
    <h2 style="color: #1A1A2E; font-family: 'Merriweather', Georgia, serif; font-size: 20px;">
      Application Status Update
    </h2>
    <p style="color: #4A5568; line-height: 1.7;">Dear ${name},</p>
    <p style="color: #4A5568; line-height: 1.7;">${statusMessages[status] || 'Your application status has been updated.'}</p>
    <div style="background: #F7F8FA; border: 1px solid #E2E8F0; border-radius: 8px; padding: 20px; margin: 24px 0;">
      <p style="color: #718096; font-size: 13px; margin: 0 0 4px;">Reference: ${referenceNumber}</p>
      <p style="color: #718096; font-size: 13px; margin: 0 0 4px;">Program: ${programName}</p>
      <p style="color: #1A3C6E; font-size: 18px; font-weight: bold; margin: 8px 0 0; text-transform: capitalize;">
        Status: ${status}
      </p>
    </div>
    <p style="color: #4A5568; line-height: 1.7;">
      If you have any questions, please contact <a href="mailto:admissions@amu.edu.eu" style="color: #1A3C6E;">admissions@amu.edu.eu</a>.
    </p>
    <p style="color: #4A5568; line-height: 1.7;">Best regards,<br><strong>AMU Admissions Office</strong></p>
  `;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || 'noreply@amu.edu.eu',
      to,
      subject: `Application Update: ${status.charAt(0).toUpperCase() + status.slice(1)} — ${referenceNumber} | AMU`,
      html: wrapEmail(content),
    });
  } catch (error) {
    console.error('Failed to send status update email:', error);
  }
}

export async function sendContactConfirmation(
  to: string,
  name: string
): Promise<void> {
  const content = `
    <h2 style="color: #1A1A2E; font-family: 'Merriweather', Georgia, serif; font-size: 20px;">
      Thank You for Contacting Us
    </h2>
    <p style="color: #4A5568; line-height: 1.7;">Dear ${name},</p>
    <p style="color: #4A5568; line-height: 1.7;">
      Thank you for reaching out to American Management University. We have received your message and a member of our team will respond to your inquiry within 2-3 business days.
    </p>
    <p style="color: #4A5568; line-height: 1.7;">Best regards,<br><strong>AMU Student Services</strong></p>
  `;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || 'noreply@amu.edu.eu',
      to,
      subject: 'Your Inquiry Has Been Received | AMU',
      html: wrapEmail(content),
    });
  } catch (error) {
    console.error('Failed to send contact confirmation email:', error);
  }
}

export async function sendAdminNotification(
  subject: string,
  body: string
): Promise<void> {
  const adminEmail = process.env.SMTP_USER || 'admin@amu.edu.eu';
  const content = `
    <h2 style="color: #1A1A2E; font-family: 'Merriweather', Georgia, serif; font-size: 20px;">
      Admin Notification
    </h2>
    <div style="color: #4A5568; line-height: 1.7;">${body}</div>
  `;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || 'noreply@amu.edu.eu',
      to: adminEmail,
      subject: `[AMU Admin] ${subject}`,
      html: wrapEmail(content),
    });
  } catch (error) {
    console.error('Failed to send admin notification:', error);
  }
}

export async function sendCertificateNotification(
  to: string,
  name: string,
  certificateId: string,
  programName: string
): Promise<void> {
  const content = `
    <h2 style="color: #1A1A2E; font-family: 'Merriweather', Georgia, serif; font-size: 20px;">
      Certificate Issued
    </h2>
    <p style="color: #4A5568; line-height: 1.7;">Dear ${name},</p>
    <p style="color: #4A5568; line-height: 1.7;">
      We are pleased to inform you that your certificate has been issued by American Management University.
    </p>
    <div style="background: #F7F8FA; border: 1px solid #E2E8F0; border-radius: 8px; padding: 20px; margin: 24px 0;">
      <p style="color: #718096; font-size: 13px; margin: 0 0 4px;">Certificate ID</p>
      <p style="color: #1A3C6E; font-size: 24px; font-weight: bold; margin: 0;">${certificateId}</p>
      <p style="color: #718096; font-size: 14px; margin: 8px 0 0;">Program: ${programName}</p>
    </div>
    <p style="color: #4A5568; line-height: 1.7;">
      Your certificate can be verified at any time using the Certificate ID at our online verification portal.
    </p>
    <p style="color: #4A5568; line-height: 1.7;">Congratulations!<br><strong>AMU Academic Affairs</strong></p>
  `;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || 'noreply@amu.edu.eu',
      to,
      subject: `Certificate Issued — ${certificateId} | AMU`,
      html: wrapEmail(content),
    });
  } catch (error) {
    console.error('Failed to send certificate notification:', error);
  }
}
