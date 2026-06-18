const SEGMENTS = [
  { corner: 'tl', d: 'M43.5 43.5 L3.452 43.5 A47 47 0 0 1 43.5 3.452 Z' },
  { corner: 'tr', d: 'M56.5 43.5 L56.5 3.452 A47 47 0 0 1 96.548 43.5 Z' },
  { corner: 'br', d: 'M56.5 56.5 L96.548 56.5 A47 47 0 0 1 56.5 96.548 Z' },
  { corner: 'bl', d: 'M43.5 56.5 L43.5 96.548 A47 47 0 0 1 3.452 56.5 Z' },
] as const;

export function LogoMark({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={`logo-mark ${className}`}
      fill="currentColor"
      role="img"
      aria-hidden="true"
      focusable="false"
    >
      {SEGMENTS.map((s) => (
        <path key={s.corner} className={`logo-q logo-q--${s.corner}`} d={s.d} />
      ))}
    </svg>
  );
}

export default function Logo({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <LogoMark className="w-10 h-10 text-red" />
      <span className="font-serif text-lg sm:text-xl text-ink">
        West Croydon Methodist Church
      </span>
    </span>
  );
}
