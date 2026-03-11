/**
 * Whitelist of patterns that are valid redirect targets.
 * - bankid:// — BankID native app deep link
 * - https://app.bankid.com/ — BankID web redirect
 * - / (relative paths) — same-origin navigation
 */
const ALLOWED_REDIRECT_PATTERNS: RegExp[] = [
  /^bankid:\/\//i,
  /^https:\/\/app\.bankid\.com\//i,
  /^\//,
];

/**
 * Returns true only if the URL matches one of the whitelisted patterns.
 */
export function isSafeRedirectUrl(url: string): boolean {
  if (!url || typeof url !== "string") return false;
  return ALLOWED_REDIRECT_PATTERNS.some((pattern) => pattern.test(url));
}

/**
 * Redirects to `url` if it passes the whitelist check.
 * Falls back to `fallback` (default: '/') and logs a warning otherwise.
 */
export function safeRedirect(url: string, fallback = "/"): void {
  if (isSafeRedirectUrl(url)) {
    window.location.href = url;
  } else {
    console.warn("[safeRedirect] Blocked redirect to disallowed URL:", url);
    window.location.href = fallback;
  }
}
