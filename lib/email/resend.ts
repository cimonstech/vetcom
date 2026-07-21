import { Resend } from "resend";

import { siteConfig } from "@/lib/constants/site";

export interface ContactNotificationPayload {
  name: string;
  email: string;
  phone?: string | null;
  message: string;
}

/**
 * Sends a contact-form notification via Resend.
 * No-ops (with a warning) until RESEND_API_KEY is configured.
 */
export async function sendContactNotification(
  payload: ContactNotificationPayload
): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn(
      "Contact notification skipped: RESEND_API_KEY is not set. Add it when Resend is ready."
    );
    return;
  }

  const to = process.env.CONTACT_NOTIFY_TO || siteConfig.email;
  const from = process.env.RESEND_FROM_EMAIL || "VETCOM Communication <onboarding@resend.dev>";

  const resend = new Resend(apiKey);
  const phoneLine = payload.phone ? `\nPhone: ${payload.phone}` : "";

  const { error } = await resend.emails.send({
    from,
    to: [to],
    replyTo: payload.email,
    subject: `New contact message from ${payload.name}`,
    text: [
      `You received a new message from the website contact form.`,
      ``,
      `Name: ${payload.name}`,
      `Email: ${payload.email}${phoneLine}`,
      ``,
      `Message:`,
      payload.message,
    ].join("\n"),
    html: `
      <div style="font-family:system-ui,sans-serif;line-height:1.5;color:#0B1F3A">
        <h2 style="margin:0 0 12px">New contact message</h2>
        <p style="margin:0 0 8px"><strong>Name:</strong> ${escapeHtml(payload.name)}</p>
        <p style="margin:0 0 8px"><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
        ${
          payload.phone
            ? `<p style="margin:0 0 8px"><strong>Phone:</strong> ${escapeHtml(payload.phone)}</p>`
            : ""
        }
        <p style="margin:16px 0 8px"><strong>Message:</strong></p>
        <p style="margin:0;white-space:pre-wrap">${escapeHtml(payload.message)}</p>
      </div>
    `,
  });

  if (error) {
    throw new Error(error.message);
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
