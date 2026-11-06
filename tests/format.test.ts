import { describe, expect, it } from 'vitest';
import { escapeHtml, formatMinutes } from '../src/format';

describe('formatMinutes', () => {
  it.each([
    [5, '5 min'],
    [60, '1 h'],
    [90, '1 h 30 min'],
    [180, '3 h'],
  ])('formats %i minutes as "%s"', (minutes, expected) => {
    expect(formatMinutes(minutes)).toBe(expected);
  });
});

describe('escapeHtml', () => {
  it('escapes markup characters', () => {
    expect(escapeHtml(`<b>"Tom" & 'Jo'</b>`)).toBe(
      '&lt;b&gt;&quot;Tom&quot; &amp; &#39;Jo&#39;&lt;/b&gt;',
    );
  });
});
