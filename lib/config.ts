/**
 * Swappable external values. Auth lives on the main app (see
 * TUTORLY_LANDING_BRIEF.md §2), we only link to it. The support form is the
 * one server-side piece: it sends through Resend and needs RESEND_API_KEY.
 */
/** The real app signup, currently bypassed — see SIGNUP_HREF below. */
export const SIGNUP_URL = "https://tutorlypartners.it/signup";

/**
 * TEMPORARY: every "sign up" CTA points at our own capture form
 * (/registrati) instead of the app, so submissions email us the lead. The
 * ?role preselects the form's dropdown. To restore the real signup, point
 * these back at SIGNUP_URL and remove the /registrati route.
 */
export function signupHref(role: "tutor" | "agency" | "student"): string {
  return `/registrati?role=${role}`;
}

/** Where support and demo requests land. */
export const CONTACT_EMAIL = "tutorlyitalia@gmail.com";
export const DEMO_EMAIL = "tutorlyitalia@gmail.com";
