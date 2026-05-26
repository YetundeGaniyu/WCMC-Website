import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const ROUTING: Record<string, string> = {
  general: process.env.EMAIL_GENERAL!,
  visit: process.env.EMAIL_GENERAL!,
  pastoral: process.env.EMAIL_MINISTER!,
  hallhire: process.env.EMAIL_BOOKINGS!,
  safeguarding: process.env.EMAIL_SAFEGUARDING!,
};

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ success: false, error: 'All fields are required' }, { status: 400 });
    }

    const toEmail = ROUTING[subject];
    if (!toEmail) {
      return NextResponse.json({ success: false, error: 'Invalid subject' }, { status: 400 });
    }

    let emailSubject = `Contact form: ${subject}`;
    if (subject === 'safeguarding') {
      emailSubject = '⚠️ SAFEGUARDING SUBMISSION';
    }

    const { error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'hello@wcmc.org.uk',
      to: toEmail,
      subject: emailSubject,
      replyTo: email,
      html: `
        <h2>New contact form submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <hr />
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br />')}</p>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ success: false, error: 'Failed to send email' }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid request' }, { status: 400 });
  }
}
