import { Resend } from 'resend';

// Lazy initialization - only create connection when needed
function getResend() {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('Resend API key is missing. Please set RESEND_API_KEY environment variable.');
  }
  return new Resend(process.env.RESEND_API_KEY);
}

export async function sendNotificationEmail(data: any) {
  try {
    const resend = getResend();
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
    
    await resend.emails.send({
      from: fromEmail,
      to: 'hello@sangtildeg.no',
      subject: `New Song Request: ${data.name}`,
      html: `
        <h2>New Submission from ${data.contactName}</h2>
        <p><strong>Person:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>About:</strong> ${data.about}</p>
        <p><strong>Language:</strong> ${data.language}</p>
        <hr>
        <p>Check Airtable for full details.</p>
      `,
    });
    return { success: true };
  } catch (error) {
    console.error('Resend error:', error);
    return { success: false };
  }
}

