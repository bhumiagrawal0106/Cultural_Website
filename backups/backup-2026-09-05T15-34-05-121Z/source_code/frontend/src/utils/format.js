/** Formats an ISO date for the active UI language, e.g. "5 Sept 2026" / "5 सित॰ 2026". */
export function formatDate(value, lang = 'en') {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleDateString(lang === 'hi' ? 'hi-IN' : 'en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

/** Returns the first letter of a name, upper-cased, for avatars. */
export function initialOf(name) {
  const trimmed = String(name || '').trim();
  return trimmed ? trimmed.charAt(0).toUpperCase() : '?';
}
