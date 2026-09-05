import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

const VALUES = [1, 2, 3, 4, 5];

/** Accessible 1-5 star picker (radiogroup with arrow-key support). */
export default function StarRating({ value = 0, onChange, disabled = false, labelledBy }) {
  const { ui } = useLanguage();
  const [hover, setHover] = useState(0);
  const shown = hover || value;

  const onKeyDown = (e) => {
    if (disabled) return;
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      e.preventDefault();
      onChange(Math.min(5, (value || 0) + 1));
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      e.preventDefault();
      onChange(Math.max(1, (value || 1) - 1));
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div
        role="radiogroup"
        aria-labelledby={labelledBy}
        className="flex gap-1"
        onMouseLeave={() => setHover(0)}
        onKeyDown={onKeyDown}
      >
        {VALUES.map((n) => (
          <button
            key={n}
            type="button"
            role="radio"
            aria-checked={value === n}
            aria-label={`${n} ${n === 1 ? ui('star') : ui('stars')}`}
            disabled={disabled}
            tabIndex={value === n || (!value && n === 1) ? 0 : -1}
            onMouseEnter={() => setHover(n)}
            onFocus={() => setHover(n)}
            onBlur={() => setHover(0)}
            onClick={() => onChange(n)}
            className={`rounded text-3xl leading-none transition hover:scale-110 disabled:cursor-not-allowed ${
              n <= shown ? 'text-india-orange' : 'text-gray-300'
            }`}
          >
            ★
          </button>
        ))}
      </div>
      <span className="min-w-[6rem] text-sm font-medium text-india-text" aria-live="polite">
        {shown > 0 ? ui(`rating${shown}`) : ''}
      </span>
    </div>
  );
}
