import React from 'react';
import { PortfolioConfig } from '../data/portfolioConfig';

interface JourneyProps {
  config: PortfolioConfig;
}

export const Journey: React.FC<JourneyProps> = ({ config }) => {
  return (
    <section id="journey" className="relative py-32 bg-[#030303] border-t border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-16">
          <span className="font-mono text-sm tracking-[0.3em] text-[#A30A19]">
            [{config.journey.sectionNumber}]
          </span>
          <div className="h-[1px] w-12 bg-[#A30A19]" />
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#929292]">
            Path & Experience
          </span>
        </div>

        <h2 className="font-display text-4xl sm:text-5xl md:text-6xl tracking-tight text-white uppercase leading-[1.08] mb-20 max-w-4xl">
          THE JOURNEY IS <span className="text-[#A30A19]">JUST</span> BEGINNING.
        </h2>

        {/* Cinematic Vertical Timeline */}
        <div className="relative pl-6 md:pl-16 border-l border-[#A30A19]/40 space-y-20 max-w-4xl">
          {config.journey.milestones.map((m) => (
            <div key={m.stage} className="relative group">
              {/* Crimson Node on Timeline */}
              <div className="absolute -left-[31px] md:-left-[71px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#030303] border-2 border-[#A30A19] group-hover:bg-[#A30A19] group-hover:shadow-[0_0_15px_#A30A19] transition-all" />

              <div className="flex items-center gap-4 text-xs font-mono mb-2">
                <span className="text-[#A30A19] tracking-[0.25em] uppercase font-bold">
                  STAGE {m.stage}
                </span>
                <span className="text-white/20">/</span>
                <span className="text-[#929292] tracking-wider uppercase">
                  {m.category}
                </span>
                <span className="text-white/20">/</span>
                <span className="text-[#929292] tracking-wider uppercase">
                  {m.period}
                </span>
              </div>

              <h3 className="font-heading text-2xl md:text-3xl text-white font-bold tracking-tight uppercase mb-4 group-hover:text-white transition-colors">
                {m.title}
              </h3>

              <p className="text-[#b5b5b5] font-sans text-base leading-relaxed mb-6 max-w-2xl">
                {m.description}
              </p>

              <div className="space-y-2 text-xs font-mono text-[#929292]">
                {m.points.map((pt, pIdx) => (
                  <div key={pIdx} className="flex items-center gap-3">
                    <span className="text-[#A30A19]">▹</span>
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
