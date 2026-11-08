import React from 'react';
import { PortfolioConfig } from '../data/portfolioConfig';

interface SkillsProps {
  config: PortfolioConfig;
}

export const Skills: React.FC<SkillsProps> = ({ config }) => {
  return (
    <section id="skills" className="relative py-32 bg-[#030303] border-t border-white/10 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute right-0 top-1/3 w-80 h-80 bg-[#A30A19]/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-16">
          <span className="font-mono text-sm tracking-[0.3em] text-[#A30A19]">
            [{config.skills.sectionNumber}]
          </span>
          <div className="h-[1px] w-12 bg-[#A30A19]" />
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#929292]">
            Technical Direction
          </span>
        </div>

        <h2 className="font-display text-4xl sm:text-5xl md:text-6xl tracking-tight text-white uppercase leading-[1.08] mb-20 max-w-4xl">
          EXPLORING THE <span className="text-[#A30A19]">FUTURE</span> THROUGH TECHNOLOGY.
        </h2>

        {/* Large Architectural Numbered Rows (No generic rounded cards) */}
        <div className="space-y-0 border-t border-white/10">
          {config.skills.categories.map((cat, idx) => (
            <div
              key={cat.number}
              className="group relative py-12 border-b border-white/10 hover:border-[#A30A19] transition-all duration-500"
            >
              {/* Subtle hover gradient wash */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#A30A19]/0 via-[#A30A19]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start relative z-10">
                {/* Numbered Index */}
                <div className="md:col-span-2">
                  <span className="font-display text-5xl md:text-7xl text-white/20 group-hover:text-[#A30A19] transition-colors duration-500">
                    {cat.number}
                  </span>
                </div>

                {/* Category Title & Subtitle */}
                <div className="md:col-span-4">
                  <h3 className="font-heading text-2xl md:text-3xl text-white font-bold tracking-tight uppercase group-hover:text-white transition-colors">
                    {cat.title}
                  </h3>
                  <div className="font-mono text-xs text-[#929292] uppercase tracking-[0.2em] mt-2">
                    {cat.subtitle}
                  </div>
                </div>

                {/* Description & Topics */}
                <div className="md:col-span-6 space-y-4">
                  <p className="text-[#b5b5b5] font-sans text-base leading-relaxed">
                    {cat.description}
                  </p>

                  <div className="pt-2 flex flex-wrap gap-x-4 gap-y-2 text-xs font-mono text-[#929292]">
                    {cat.topics.map((topic, tIdx) => (
                      <span key={topic} className="flex items-center gap-2">
                        {tIdx > 0 && <span className="text-[#A30A19]">/</span>}
                        <span className="group-hover:text-white transition-colors">{topic}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
