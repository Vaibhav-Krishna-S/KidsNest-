import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(() => {
    // Check localStorage first
    const saved = localStorage.getItem('theme-preference');
    if (saved) return saved === 'dark';
    // Default to light theme
    return false;
  });

  useEffect(() => {
    const html = document.documentElement;
    if (isDark) {
      html.classList.add('dark');
      localStorage.setItem('theme-preference', 'dark');
    } else {
      html.classList.remove('dark');
      localStorage.setItem('theme-preference', 'light');
    }
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="group relative flex items-center justify-center size-11 rounded-full bg-gradient-to-br from-[#1e9cb1]/10 to-[#ef775f]/10 backdrop-blur-sm border border-[#1e9cb1]/20 transition-all hover:scale-110 hover:shadow-lg hover:shadow-[#1e9cb1]/20"
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      data-testid="button-theme-toggle"
    >
      {/* Sun icon - visible in light mode */}
      <div className={`absolute transition-all duration-500 ${isDark ? 'opacity-0 scale-0 -rotate-90' : 'opacity-100 scale-100 rotate-0'}`}>
        <Sun className="size-5 text-[#f3c94f]" strokeWidth={2.5} />
      </div>

      {/* Moon icon - visible in dark mode */}
      <div className={`absolute transition-all duration-500 ${isDark ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-0 rotate-90'}`}>
        <Moon className="size-5 text-[#1e9cb1]" strokeWidth={2.5} />
      </div>

      {/* Glow effect */}
      <div className={`absolute inset-0 rounded-full transition-all duration-500 ${isDark ? 'bg-[#1e9cb1]/20 blur-md' : 'bg-[#f3c94f]/20 blur-md'}`} />
    </button>
  );
}
