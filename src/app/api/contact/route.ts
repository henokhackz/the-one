import { NextResponse } from 'next/server';
import { rateLimit, getClientIp } from '@/lib/rate-limit';

// Simple HTML sanitizer to strip dangerous markup & scripts
function sanitize(input: string): string {
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<[^>]+>/g, '')
    .trim();
}

// Basic email validation regex (RFC 5322 standard simplified)
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export async function POST(req: Request) {
  try {
    const clientIp = getClientIp(req);

    // 1. Strict rate limit for contact inquiries: max 5 messages per 15 minutes per IP
    const limitResult = rateLimit(`contact_${clientIp}`, {
      limit: 5,
      windowSeconds: 15 * 60,
    });

    if (!limitResult.success) {
      return NextResponse.json(
        {
          error: 'Too many messages sent. Please wait before sending another inquiry or contact directly via email.',
          retryAfter: limitResult.resetSeconds,
        },
        {
          status: 429,
          headers: {
            'Retry-After': String(limitResult.resetSeconds),
            'X-RateLimit-Limit': String(limitResult.limit),
            'X-RateLimit-Remaining': '0',
          },
        }
      );
    }

    // 2. Request body size safety clamp (< 15KB)
    const rawBody = await req.text();
    if (rawBody.length > 15 * 1024) {
      return NextResponse.json({ error: 'Payload too large.' }, { status: 413 });
    }

    let parsedData: any;
    try {
      parsedData = JSON.parse(rawBody);
    } catch {
      return NextResponse.json({ error: 'Malformed JSON payload.' }, { status: 400 });
    }

    const { name, email, subject, message, honeypot } = parsedData;

    // 3. Honeypot check: Bots fill hidden fields; humans do not
    if (honeypot && String(honeypot).trim() !== '') {
      // Silently fake success to trap the bot without warning it
      return NextResponse.json({ success: true, message: 'Message received.' });
    }

    // 4. Validate and sanitize inputs
    const cleanName = sanitize(String(name || ''));
    const cleanEmail = String(email || '').trim().toLowerCase();
    const cleanSubject = sanitize(String(subject || 'Portfolio Inquiry'));
    const cleanMessage = sanitize(String(message || ''));

    if (!cleanName || cleanName.length < 2 || cleanName.length > 100) {
      return NextResponse.json({ error: 'Please enter a valid name (2–100 characters).' }, { status: 422 });
    }

    if (!cleanEmail || cleanEmail.length > 120 || !EMAIL_REGEX.test(cleanEmail)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 422 });
    }

    if (!cleanMessage || cleanMessage.length < 5 || cleanMessage.length > 3000) {
      return NextResponse.json({ error: 'Please provide a message between 5 and 3,000 characters.' }, { status: 422 });
    }

    // 5. Securely log incoming inquiry for the developer
    console.log(`\n📬 [NEW INQUIRY RECEIVED]`);
    console.log(`   From: ${cleanName} <${cleanEmail}>`);
    console.log(`   Subject: ${cleanSubject}`);
    console.log(`   Length: ${cleanMessage.length} chars`);
    console.log(`   IP: ${clientIp} at ${new Date().toISOString()}`);

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you! Your message has been received. I will reply to you as soon as possible.',
      },
      {
        status: 200,
        headers: {
          'X-RateLimit-Limit': String(limitResult.limit),
          'X-RateLimit-Remaining': String(limitResult.remaining),
        },
      }
    );
  } catch (error) {
    console.error('Contact API Error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred while processing your message. Please reach out via email directly.' },
      { status: 500 }
    );
  }
}
