/**
 * mailer.ts
 * ─────────
 * Core email-sending module using Nodemailer + Gmail SMTP (free).
 *
 * Public API
 * ──────────
 * sendEmail(opts: SendEmailOptions): Promise<SendEmailResult>
 *   Send an email. Pair with EMAIL_TEMPLATES from template.ts for pre-built
 *   event templates — e.g. sendEmail(EMAIL_TEMPLATES.requestApproved({...})).
 *
 * verifyConnection(): Promise<void>
 *   Verify SMTP credentials at startup. Call once in server.ts.
 */

import nodemailer, { type Transporter, type SentMessageInfo } from 'nodemailer';

// ── Lazy transporter (created on first use) ─────────────────────────────────
let _transporter: Transporter | null = null;

function getTransporter(): Transporter {
    if (_transporter) return _transporter;

    const user = process.env['SMTP_USER'];
    const pass = process.env['SMTP_PASS'];
    const from = process.env['SMTP_FROM'];

    if (!user || !pass || !from) {
        throw new Error(
            'Missing env vars. Make sure SMTP_USER, SMTP_PASS, and SMTP_FROM are set in your .env file.',
        );
    }

    _transporter = nodemailer.createTransport({
        host: process.env['SMTP_HOST'] || 'smtp.gmail.com',
        port: process.env['SMTP_PORT'] ? parseInt(process.env['SMTP_PORT'], 10) : 587,
        secure: false,
        auth: { user, pass },
    });

    return _transporter;
}

function getFromAddress(): string {
    return process.env['SMTP_FROM'] || 'noreply@example.com';
}

// ── Types ────────────────────────────────────────────────────────────────────

export interface SendEmailOptions {
    /** One recipient or an array of recipients */
    to: string | string[];
    /** Subject line. Defaults to "(no subject)" */
    subject?: string;
    /** Email body — plain-text by default, HTML when html: true */
    message: string;
    /** Pass true to treat `message` as HTML */
    html?: boolean;
}

export interface SendEmailResult {
    success: boolean;
    messageId?: string;
    accepted: string[];
    rejected: string[];
    error?: string;
}

// ── sendEmail ─────────────────────────────────────────────────────────────────
/**
 * Send an email via Gmail SMTP.
 *
 * Designed to pair with the EMAIL_TEMPLATES registry in template.ts so that
 * every log-event notification is a single, readable call:
 *
 * @example
 * // Plain event — pre-built template
 * await sendEmail(EMAIL_TEMPLATES.requestApproved({ to: user.email, name: user.name, deviceName: item.name }));
 *
 * @example
 * // Ad-hoc one-off
 * await sendEmail({ to: 'ops@example.com', subject: 'Alert', message: 'Disk full.' });
 */
export async function sendEmail(opts: SendEmailOptions): Promise<SendEmailResult> {
    const { message, to, subject = '(no subject)', html = false } = opts;

    const recipients = Array.isArray(to) ? to : [to];

    if (recipients.length === 0) {
        return {
            success: false,
            accepted: [],
            rejected: [],
            error: 'No recipients provided.',
        };
    }

    try {
        const info: SentMessageInfo = await getTransporter().sendMail({
            from: `"Asset Pilot" <${getFromAddress()}>`,
            to: recipients.join(', '),
            subject,
            // Provide both html and text so clients that can't render HTML
            // still see readable content.
            ...(html
                ? { html: message, text: message.replace(/<[^>]*>/g, '') }
                : { text: message }),
        });

        return {
            success: true,
            messageId: info.messageId as string,
            accepted: info.accepted as string[],
            rejected: info.rejected as string[],
        };
    } catch (err) {
        const error = err instanceof Error ? err.message : String(err);
        return {
            success: false,
            accepted: [],
            rejected: recipients,
            error,
        };
    }
}

// ── verifyConnection ──────────────────────────────────────────────────────────
/**
 * Verifies the SMTP connection and credentials.
 * Call once in server.ts at startup to catch misconfiguration early.
 */
export async function verifyConnection(): Promise<void> {
    await getTransporter().verify();
}
