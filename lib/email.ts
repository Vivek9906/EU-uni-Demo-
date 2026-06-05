import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  host: 'smtp.hostinger.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const emailHeader = `
<div style="background: #1A3C6E; padding: 24px; text-align: center;">
  <h1 style="color: #FFFFFF; font-family: 'Merriweather', Georgia, serif; margin: 0; font-size: 24px;">
    EU American University
  </h1>
  <p style="color: #B8860B; font-family: 'Source Sans 3', Arial, sans-serif; margin: 4px 0 0; font-size: 14px;">
    A leader's choice in education
  </p>
</div>
`;

const emailFooter = `
<div style="background: #F7F8FA; padding: 24px; text-align: center; border-top: 1px solid #E2E8F0;">
  <p style="color: #718096; font-family: 'Source Sans 3', Arial, sans-serif; font-size: 13px; margin: 0;">
    © ${new Date().getFullYear()} EU American University. All rights reserved.
  </p>
  <p style="color: #718096; font-family: 'Source Sans 3', Arial, sans-serif; font-size: 13px; margin: 8px 0 0;">
    11 rue Magdebourg, Paris, France 75016
  </p>
</div>
`;

export function wrapEmail(content: string): string {
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

export async function sendProgramApplicationEmail(
  to: string,
  name: string,
  referenceNumber: string,
  programName: string
): Promise<void> {
  const content = `
    <h2 style="color: #1A1A2E; font-family: 'Merriweather', Georgia, serif; font-size: 20px;">
      Program Application Received
    </h2>
    <p style="color: #4A5568; line-height: 1.7;">
      Dear ${name},
    </p>
    <p style="color: #4A5568; line-height: 1.7;">
      Thank you for applying to the <strong>${programName}</strong> program at EU American University. We have successfully received your application.
    </p>
    <div style="background: #F7F8FA; border: 1px solid #E2E8F0; border-radius: 8px; padding: 20px; margin: 24px 0;">
      <p style="color: #718096; font-size: 13px; margin: 0 0 4px; text-transform: uppercase; letter-spacing: 1px;">
        Application Reference
      </p>
      <p style="color: #1A3C6E; font-size: 24px; font-weight: bold; margin: 0;">
        ${referenceNumber}
      </p>
    </div>
    <p style="color: #4A5568; line-height: 1.7;">
      Our admissions team will review your qualifications and get back to you shortly regarding the next steps in your enrollment process.
    </p>
    <p style="color: #4A5568; line-height: 1.7;">
      Best regards,<br>
      <strong>EUAU Admissions Office</strong>
    </p>
  `;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || 'noreply@euamericanuniversity.us',
      to,
      subject: `Program Application: ${programName} | EU American University`,
      html: wrapEmail(content),
    });
  } catch (error) {
    console.error('Failed to send program application email:', error);
    throw error;
  }
}

export async function sendCertificateApplicationEmail(
  to: string,
  name: string,
  referenceNumber: string,
  certificateName: string
): Promise<void> {
  const content = `
    <h2 style="color: #1A1A2E; font-family: 'Merriweather', Georgia, serif; font-size: 20px;">
      Certificate Application Received
    </h2>
    <p style="color: #4A5568; line-height: 1.7;">
      Dear ${name},
    </p>
    <p style="color: #4A5568; line-height: 1.7;">
      Thank you for your interest in the <strong>${certificateName}</strong> certificate at EU American University. We have successfully received your application request.
    </p>
    <div style="background: #F7F8FA; border: 1px solid #E2E8F0; border-radius: 8px; padding: 20px; margin: 24px 0;">
      <p style="color: #718096; font-size: 13px; margin: 0 0 4px; text-transform: uppercase; letter-spacing: 1px;">
        Request Reference
      </p>
      <p style="color: #1A3C6E; font-size: 24px; font-weight: bold; margin: 0;">
        ${referenceNumber}
      </p>
    </div>
    <p style="color: #4A5568; line-height: 1.7;">
      Our certification department will review your application and be in touch soon with further instructions.
    </p>
    <p style="color: #4A5568; line-height: 1.7;">
      Best regards,<br>
      <strong>EUAU Certification Department</strong>
    </p>
  `;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || 'noreply@euamericanuniversity.us',
      to,
      subject: `Certificate Application: ${certificateName} | EU American University`,
      html: wrapEmail(content),
    });
  } catch (error) {
    console.error('Failed to send certificate application email:', error);
    throw error;
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
    accepted: 'Congratulations! Your application has been accepted. Welcome to EU American University!',
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
      If you have any questions, please contact <a href="mailto:admissions@euamericanuniversity.us" style="color: #1A3C6E;">admissions@euamericanuniversity.us</a>.
    </p>
    <p style="color: #4A5568; line-height: 1.7;">Best regards,<br><strong>EUAU Admissions Office</strong></p>
  `;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || 'noreply@euamericanuniversity.us',
      to,
      subject: `Application Update: ${status.charAt(0).toUpperCase() + status.slice(1)} — ${referenceNumber} | EU American University`,
      html: wrapEmail(content),
    });
  } catch (error) {
    console.error('Failed to send status update email:', error);
    throw error;
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
      Thank you for reaching out to EU American University. We have received your message and a member of our team will respond to your inquiry within 2-3 business days.
    </p>
    <p style="color: #4A5568; line-height: 1.7;">Best regards,<br><strong>EUAU Student Services</strong></p>
  `;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || 'noreply@euamericanuniversity.us',
      to,
      subject: 'Your Inquiry Has Been Received | EU American University',
      html: wrapEmail(content),
    });
  } catch (error) {
    console.error('Failed to send contact confirmation email:', error);
    throw error;
  }
}

export async function sendAdminNotification(
  subject: string,
  body: string
): Promise<void> {
  const adminEmail = process.env.SMTP_USER || 'admin@euamericanuniversity.us';
  const content = `
    <h2 style="color: #1A1A2E; font-family: 'Merriweather', Georgia, serif; font-size: 20px;">
      Admin Notification
    </h2>
    <div style="color: #4A5568; line-height: 1.7;">${body}</div>
  `;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || 'noreply@euamericanuniversity.us',
      to: adminEmail,
      subject: `[EUAU Admin] ${subject}`,
      html: wrapEmail(content),
    });
  } catch (error) {
    console.error('Failed to send admin notification:', error);
    throw error;
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
      We are pleased to inform you that your certificate has been issued by EU American University.
    </p>
    <div style="background: #F7F8FA; border: 1px solid #E2E8F0; border-radius: 8px; padding: 20px; margin: 24px 0;">
      <p style="color: #718096; font-size: 13px; margin: 0 0 4px;">Certificate ID</p>
      <p style="color: #1A3C6E; font-size: 24px; font-weight: bold; margin: 0;">${certificateId}</p>
      <p style="color: #718096; font-size: 14px; margin: 8px 0 0;">Program: ${programName}</p>
    </div>
    <p style="color: #4A5568; line-height: 1.7;">
      Your certificate can be verified at any time using the Certificate ID at our online verification portal.
    </p>
    <p style="color: #4A5568; line-height: 1.7;">Congratulations!<br><strong>EUAU Academic Affairs</strong></p>
  `;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || 'noreply@euamericanuniversity.us',
      to,
      subject: `Certificate Issued — ${certificateId} | EU American University`,
      html: wrapEmail(content),
    });
  } catch (error) {
    console.error('Failed to send certificate notification:', error);
    throw error;
  }
}

export async function sendNewsletterConfirmation(
  to: string
): Promise<void> {
  const content = `
    <h2 style="color: #1A1A2E; font-family: 'Merriweather', Georgia, serif; font-size: 20px;">
      Welcome to the EU American University Newsletter
    </h2>
    <p style="color: #4A5568; line-height: 1.7;">
      Thank you for subscribing to our newsletter!
    </p>
    <p style="color: #4A5568; line-height: 1.7;">
      We are thrilled to have you with us. You'll now be the first to hear about our latest programs, upcoming events, academic achievements, and global partnerships.
    </p>
    <div style="background: #F7F8FA; border: 1px solid #E2E8F0; border-radius: 8px; padding: 20px; margin: 24px 0; text-align: center;">
      <p style="color: #1A3C6E; font-size: 16px; font-weight: bold; margin: 0;">
        Stay Connected with EUAU
      </p>
    </div>
    <p style="color: #4A5568; line-height: 1.7;">
      If you ever wish to stop receiving these updates, you can unsubscribe at any time.
    </p>
    <p style="color: #4A5568; line-height: 1.7;">Best regards,<br><strong>EUAU Communications Team</strong></p>
  `;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || 'noreply@euamericanuniversity.us',
      to,
      subject: 'Thank You for Subscribing | EU American University',
      html: wrapEmail(content),
    });
  } catch (error) {
    console.error('Failed to send newsletter confirmation:', error);
    throw error;
  }
}

export async function sendBroadcastEmail(
  to: string[],
  subject: string,
  title: string,
  excerpt: string,
  linkUrl?: string,
  linkText: string = 'Read More'
): Promise<void> {
  const content = `
    <h2 style="color: #1A1A2E; font-family: 'Merriweather', Georgia, serif; font-size: 20px;">
      ${title}
    </h2>
    <p style="color: #4A5568; line-height: 1.7;">
      ${excerpt}
    </p>
    ${linkUrl ? `
    <div style="margin: 30px 0;">
      <a href="${linkUrl}" style="background: #1A3C6E; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">${linkText}</a>
    </div>
    ` : ''}
    <p style="color: #4A5568; line-height: 1.7; font-size: 13px; margin-top: 40px;">
      You are receiving this email because you subscribed to the EU American University newsletter.
    </p>
  `;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || 'info@euamericanuniversity.us',
      bcc: to, // Send as BCC so recipients don't see each other
      subject: `${subject} | EU American University`,
      html: wrapEmail(content),
    });
  } catch (error) {
    console.error('Failed to send broadcast email:', error);
    throw error;
  }
}

