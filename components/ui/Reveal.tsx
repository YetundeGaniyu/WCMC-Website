'use client';

/**
 * Reveal — fades its children up into view as you scroll to them.
 *
 * Usage:  <Reveal>...content...</Reveal>
 *         <Reveal delay={150}>...later item...</Reveal>   // ms head-start for staggering
 *
 * Safe by design: if JavaScript is off (see the <noscript> rule in app/layout.tsx)
 * or the visitor prefers reduced motion, the content simply shows with no animation.
 */

import { useEffect, useRef, useState } from 'react';

export default function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || typeof IntersectionObserver === 'undefined') {
      setShown(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`reveal ${shown ? 'reveal--in' : ''} ${className}`}
    >
      {children}
    </div>
  );
}
