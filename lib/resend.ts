import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendNotificationEmail(data: any) {
  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
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

