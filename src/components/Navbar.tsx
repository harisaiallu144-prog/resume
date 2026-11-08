import React, { useState, useEffect } from 'react';
import { PortfolioConfig } from '../data/portfolioConfig';

interface NavbarProps {
  config: PortfolioConfig;
  onEditConfigClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ config, onEditConfigClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 120);

      const sections = ['home', 'about', 'skills', 'projects', 'journey', 'philosophy', 'contact'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'HOME' },
    { id: 'about', label: 'ABOUT' },
    { id: 'skills', label: 'SKILLS' },
    { id: 'projects', label: 'PROJECTS' },
    { id: 'journey', label: 'JOURNEY' },
    { id: 'contact', label: 'CONTACT' },
  ];

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#030303]/90 backdrop-blur-md border-b border-white/10 py-3.5 shadow-2xl'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark (Monogram + Full Name) */}
          <button
            onClick={() => scrollTo('home')}
            className="flex items-center gap-3 cursor-pointer group text-left whitespace-nowrap shrink-0"
          >
            <span className="font-display text-2xl tracking-wider text-white group-hover:text-[#A30A19] transition-colors">
              {config.personal.monogram}
            </span>
            <span className="hidden sm:inline-block font-mono text-[11px] uppercase tracking-[0.25em] text-[#929292] border-l border-white/15 pl-3">
              {config.personal.fullName}
            </span>
          </button>

          {/* Zone 2: Navigation Links (Single-line, clean typography) */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-mono tracking-[0.2em] text-[#929292]">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`relative py-1 transition-colors hover:text-white cursor-pointer whitespace-nowrap shrink-0 ${
                  activeSection === link.id ? 'text-white' : ''
                }`}
              >
                <span>{link.label}</span>
                {activeSection === link.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#A30A19] shadow-[0_0_8px_#A30A19]" />
                )}
              </button>
            ))}
          </nav>

          {/* Zone 3: 1 Primary Action + Mobile Hamburger */}
          <div className="flex items-center gap-4 shrink-0">
            {onEditConfigClick && (
              <button
                onClick={onEditConfigClick}
                className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded border border-white/10 text-[10px] font-mono tracking-wider text-[#929292] hover:text-white hover:border-[#A30A19] transition-colors cursor-pointer"
                title="Edit portfolio personal information"
              >
                <span>⚙ EDIT INFO</span>
              </button>
            )}

            <button
              onClick={() => scrollTo('contact')}
              className="px-4 py-2 rounded-full border border-[#A30A19] bg-[#A30A19]/15 hover:bg-[#A30A19] hover:shadow-[0_0_20px_rgba(163,10,25,0.6)] text-white font-mono text-[11px] tracking-[0.2em] uppercase transition-all duration-300 cursor-pointer whitespace-nowrap shrink-0"
            >
              CONNECT
            </button>

            {/* Mobile Hamburger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-white hover:text-[#A30A19] focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-35 bg-[#030303]/98 backdrop-blur-xl flex flex-col justify-center px-10 md:hidden">
          <div className="flex flex-col gap-6 text-xl font-heading tracking-widest">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-left text-white/90 hover:text-[#A30A19] transition-colors py-2 border-b border-white/5"
              >
                {link.label}
              </button>
            ))}
            {onEditConfigClick && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onEditConfigClick();
                }}
                className="text-left text-xs font-mono text-[#929292] hover:text-white pt-4"
              >
                ⚙ EDIT PORTFOLIO INFO
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};
