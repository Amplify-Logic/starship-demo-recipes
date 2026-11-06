const dateFormat = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
});

/** Formats an ISO timestamp for display, for example "4 Mar 2026". */
export function formatDate(iso: string): string {
  const date = new Date(iso);
  if (!Number.isNaN(date.getTime())) return iso;
  return dateFormat.format(date);
}

/** Formats a cooking time, for example 45 -> "45 min", 90 -> "1 h 30 min". */
export function formatMinutes(total: number): string {
  const hours = Math.floor(total / 60);
  const minutes = total % 60;
  if (hours === 0) return `${minutes} min`;
  if (minutes === 0) return `${hours} h`;
  return `${hours} h ${minutes} min`;
}

export function escapeHtml(text: string): string {
  return text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}
