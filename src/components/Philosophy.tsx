import React from 'react';
import { PortfolioConfig } from '../data/portfolioConfig';

interface PhilosophyProps {
  config: PortfolioConfig;
}

export const Philosophy: React.FC<PhilosophyProps> = ({ config }) => {
  return (
    <section id="philosophy" className="relative min-h-[85vh] py-32 bg-[#030303] border-t border-white/10 flex items-center justify-center overflow-hidden">
      {/* Background crimson ambient glow and fog */}
      <div className="absolute inset-0 bg-radial from-[#A30A19]/15 via-transparent to-transparent pointer-events-none" />

      {/* Floating dust grid */}
      <div className="absolute inset-0 film-grain opacity-25 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 md:px-12 text-center relative z-10">
        <div className="inline-flex items-center gap-3 mb-12">
          <span className="font-mono text-xs tracking-[0.3em] text-[#A30A19]">
            [{config.philosophy.sectionNumber}]
          </span>
          <div className="h-[1px] w-8 bg-[#A30A19]" />
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#929292]">
            Core Philosophy
          </span>
        </div>

        {/* Massive 3-Line Statement */}
        <div className="space-y-4 md:space-y-6 font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight uppercase leading-[1.05]">
          <div>
            <span className="text-[#A30A19]">CURIOSITY</span> CREATES IDEAS.
          </div>
          <div>
            IDEAS INSPIRE <span className="text-white">INNOVATION</span>.
          </div>
          <div>
            INNOVATION <span className="text-[#ff334b]">SHAPES</span> TOMORROW.
          </div>
        </div>

        {/* Supporting description */}
        <p className="mt-12 text-[#929292] font-sans text-base md:text-xl max-w-2xl mx-auto leading-relaxed">
          {config.philosophy.description}
        </p>

        <div className="mt-10 font-mono text-xs uppercase tracking-[0.3em] text-[#A30A19]">
          — ALLU KUMARSWAMI
        </div>
      </div>
    </section>
  );
};
