import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const ROUTING: Record<string, string | undefined> = {
  general: process.env.EMAIL_GENERAL,
  visit: process.env.EMAIL_GENERAL,
  pastoral: process.env.EMAIL_MINISTER,
  hallhire: process.env.EMAIL_BOOKINGS,
  safeguarding: process.env.EMAIL_SAFEGUARDING,
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

    // Only send email when Resend is configured. Without a key we don't crash —
    // we log the submission (handy in local dev) and report it's not configured.
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.warn('[contact] RESEND_API_KEY not set — submission logged, no email sent.');
      console.log('[contact] submission:', { name, email, subject });
      return NextResponse.json(
        { success: false, error: 'Email is not configured on the server yet.' },
        { status: 503 },
      );
    }

    const resend = new Resend(apiKey);

    let emailSubject = `Contact form: ${subject}`;
    if (subject === 'safeguarding') {
      emailSubject = '⚠️ SAFEGUARDING SUBMISSION';
    }

    const { error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'hello@westcroydonmeth.co.uk',
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
