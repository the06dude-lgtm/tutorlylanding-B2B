import "server-only";

/**
 * Envelope sender. MUST be on a domain verified in Resend — tutorly.it is
 * verified at the root, which is what authorises the from address. A gmail.com
 * from would be rejected: we can't DKIM-sign for Google's domain.
 *
 * Not in lib/config.ts because that module is bundled into client components,
 * where server env vars read as undefined. `server-only` above turns any
 * client import of this file into a build error rather than a silent bug.
 */
export const EMAIL_FROM =
  process.env.EMAIL_FROM ?? "Tutorly <assistenza@tutorly.it>";

export const EMAIL_MAX = { name: 100, email: 200, message: 4000 };

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
