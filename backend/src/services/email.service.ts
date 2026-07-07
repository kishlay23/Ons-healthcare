import { Resend } from "resend";
import { logger } from "../utils/logger";

// ── Provider interface ────────────────────────────────────────────────────────
// To swap providers in the future, implement this interface and add a case
// to the factory at the bottom.  The rest of the codebase never changes.
export interface IEmailService {
  sendPasswordReset(
    to: string,
    firstName: string,
    resetLink: string,
  ): Promise<void>;
}

// ── Resend provider ───────────────────────────────────────────────────────────
class ResendEmailService implements IEmailService {
  private client: Resend;
  private from: string;

  constructor() {
    const key = process.env.RESEND_API_KEY;
    if (!key) throw new Error("RESEND_API_KEY environment variable is not set");
    this.client = new Resend(key);
    this.from =
      process.env.EMAIL_FROM ?? "ONS Healthcare <noreply@onshealthcare.in>";
  }

  async sendPasswordReset(
    to: string,
    firstName: string,
    resetLink: string,
  ): Promise<void> {
    const { error } = await this.client.emails.send({
      from: this.from,
      to,
      subject: "Reset your ONS Healthcare password",
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;">
          <h2 style="color:#7c3aed;margin-bottom:8px;">ONS Healthcare</h2>
          <p>Hi ${firstName},</p>
          <p>We received a request to reset your password. Click the button below — this link is valid for <strong>1 hour</strong>.</p>
          <a href="${resetLink}"
             style="display:inline-block;margin:16px 0;padding:12px 28px;background:#b91c1c;color:#fff;
                    text-decoration:none;border-radius:8px;font-weight:600;font-size:15px;">
            Reset Password
          </a>
          <p style="color:#666;font-size:14px;">
            If you didn't request this, you can safely ignore this email — your password won't change.
          </p>
          <p style="color:#999;font-size:12px;margin-top:24px;">
            Button not working? Copy this URL into your browser:<br/>
            <a href="${resetLink}" style="color:#7c3aed;">${resetLink}</a>
          </p>
        </div>
      `,
    });

    if (error) {
      logger.error("Failed to send password reset email", error);
      throw new Error("Failed to send email");
    }
    logger.info(`Password reset email sent to ${to}`);
  }
}

// ── Future provider stubs (uncomment and implement when ready) ────────────────
//
// class SESEmailService implements IEmailService {
//   async sendPasswordReset(to, firstName, resetLink) { /* AWS SES logic */ }
// }
//
// class AzureEmailService implements IEmailService {
//   async sendPasswordReset(to, firstName, resetLink) { /* Azure Communication Services logic */ }
// }

// ── Factory ───────────────────────────────────────────────────────────────────
// Switch provider by setting EMAIL_PROVIDER=ses or EMAIL_PROVIDER=azure in .env
function createEmailService(): IEmailService {
  const provider = process.env.EMAIL_PROVIDER ?? "resend";
  switch (provider) {
    case "resend":
      return new ResendEmailService();
    // case 'ses':   return new SESEmailService()
    // case 'azure': return new AzureEmailService()
    default:
      throw new Error(
        `Unknown EMAIL_PROVIDER: "${provider}". Valid values: resend, ses, azure`,
      );
  }
}

export const emailService = createEmailService();
