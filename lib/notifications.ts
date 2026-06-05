import prisma from '@/lib/db';
import { transporter, wrapEmail } from '@/lib/email';

export async function sendBroadcastEmail(subject: string, htmlContent: string) {
  try {
    const subscribers = await prisma.subscriber.findMany({
      where: { isActive: true },
    });

    if (subscribers.length === 0) {
      return { success: true, count: 0 };
    }

    const content = `
      <h2 style="color: #1A1A2E; font-family: 'Merriweather', Georgia, serif; font-size: 20px;">
        ${subject}
      </h2>
      <div style="color: #4A5568; line-height: 1.7;">
        ${htmlContent}
      </div>
      <p style="color: #4A5568; line-height: 1.7; margin-top: 24px;">
        Best regards,<br>
        <strong>EU American University</strong>
      </p>
    `;

    const fullHtml = wrapEmail(content);

    // Bcc all subscribers (to hide emails from each other)
    // For very large lists, consider batching. 
    // Here we use a single email with Bcc for simplicity.
    const bccList = subscribers.map((sub) => sub.email);

    await transporter.sendMail({
      from: process.env.EMAIL_FROM || 'noreply@euamericanuniversity.us',
      to: process.env.EMAIL_FROM || 'noreply@euamericanuniversity.us',
      bcc: bccList,
      subject: subject,
      html: fullHtml,
    });

    return { success: true, count: subscribers.length };
  } catch (error) {
    console.error('[BROADCAST_ERROR]', error);
    return { success: false, error };
  }
}
