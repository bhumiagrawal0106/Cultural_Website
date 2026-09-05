// Client-side rules that mirror the express-validator rules in /backend/routes.

export const NAME_MIN = 2;
export const NAME_MAX = 60;
export const PASSWORD_MIN = 8;
export const MESSAGE_MIN = 3;
export const MESSAGE_MAX = 2000;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MONGO_ID_RE = /^[a-f\d]{24}$/i;

export function isValidEmail(value) {
  return EMAIL_RE.test(String(value || '').trim());
}

export function isValidName(value) {
  const len = String(value || '').trim().length;
  return len >= NAME_MIN && len <= NAME_MAX;
}

export function isValidPassword(value) {
  return String(value || '').length >= PASSWORD_MIN;
}

export function isMongoId(value) {
  return MONGO_ID_RE.test(String(value || ''));
}
