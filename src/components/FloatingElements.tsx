import { useMemo } from 'react';
import { ThemeId } from '../types';
import { THEME_CONFIGS } from '../data/questions';

interface FloatingElementsProps {
  theme: ThemeId;
}

export const FloatingElements = ({ theme }: FloatingElementsProps) => {
  const symbols = THEME_CONFIGS[theme]?.floatingSymbols || ['❤️', '✨', '💕'];

  // Generate 16 stable decorative floating items
  const items = useMemo(() => {
    return Array.from({ length: 16 }).map((_, i) => ({
      id: i,
      symbol: symbols[i % symbols.length],
      left: `${(i * 6.25 + 3) % 94}%`,
      animationDuration: `${12 + (i % 7) * 2.5}s`,
      animationDelay: `${(i * 0.8) % 6}s`,
      fontSize: `${18 + (i % 5) * 6}px`,
      opacity: 0.18 + ((i % 4) * 0.08),
    }));
  }, [symbols]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {items.map((item) => (
        <span
          key={item.id}
          className="absolute animate-float-up select-none"
          style={{
            left: item.left,
            bottom: '-40px',
            fontSize: item.fontSize,
            opacity: item.opacity,
            animationDuration: item.animationDuration,
            animationDelay: item.animationDelay,
            animationIterationCount: 'infinite',
            animationTimingFunction: 'linear',
          }}
        >
          {item.symbol}
        </span>
      ))}
    </div>
  );
};
