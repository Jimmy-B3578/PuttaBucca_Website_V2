import { Resend } from 'resend';
import { EmailTemplate } from '../../components/EmailTemplate';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, quantity, unit, productName, message } = body;

    const { data, error } = await resend.emails.send({
      from: 'Customer Quote - website <sales@puttabucca.com.au>', // This must be a verified domain in Resend
      to: ['sales@puttabucca.com.au'], // The email address you want to receive quotes at
      subject: `New Quote Request for ${productName}`,
      react: EmailTemplate({ name, email, phone, quantity, unit, productName, message }),
    });

    if (error) {
      console.error('Resend Error:', error);
      return NextResponse.json({ error: 'Error sending email' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Email sent successfully!', data });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
} 