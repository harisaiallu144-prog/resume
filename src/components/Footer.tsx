import React from 'react';
import { PortfolioConfig } from '../data/portfolioConfig';

interface FooterProps {
  config: PortfolioConfig;
}

export const Footer: React.FC<FooterProps> = ({ config }) => {
  const currentYear = new Date().getFullYear();

  const scrollTo = (id: string) => {
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
    <footer className="bg-[#020202] border-t border-white/10 py-20 text-[#929292] font-mono text-xs select-none">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-between gap-12">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 pb-12 border-b border-white/5">
          <div>
            <div className="font-display text-3xl md:text-5xl text-white tracking-wider uppercase mb-2">
              {config.footer.name}
            </div>
            <div className="text-[#A30A19] uppercase tracking-[0.2em] font-heading font-medium text-sm">
              {config.footer.title}
            </div>
            <div className="text-[#929292] text-xs mt-1">
              {config.footer.roleDescription}
            </div>
          </div>

          <div className="flex flex-wrap gap-8 text-xs tracking-widest uppercase">
            <button onClick={() => scrollTo('home')} className="hover:text-white transition-colors cursor-pointer">
              Home
            </button>
            <button onClick={() => scrollTo('about')} className="hover:text-white transition-colors cursor-pointer">
              About
            </button>
            <button onClick={() => scrollTo('projects')} className="hover:text-white transition-colors cursor-pointer">
              Projects
            </button>
            <a
              href={config.personal.linkedin}
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#A30A19] transition-colors"
            >
              LinkedIn ↗
            </a>
            <a
              href={config.personal.github}
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#A30A19] transition-colors"
            >
              GitHub ↗
            </a>
            <button onClick={() => scrollTo('contact')} className="hover:text-white transition-colors cursor-pointer">
              Contact
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#929292]/70">
          <div>
            &copy; {currentYear} {config.footer.name}. All rights reserved.
          </div>
          <div className="font-heading italic text-white/50">
            &ldquo;{config.footer.closingStatement}&rdquo;
          </div>
          <div>
            3D Particle Engine · Three.js & GLSL
          </div>
        </div>
      </div>
    </footer>
  );
};
