import React from 'react';
import { PortfolioConfig } from '../data/portfolioConfig';

interface AboutProps {
  config: PortfolioConfig;
}

export const About: React.FC<AboutProps> = ({ config }) => {
  return (
    <section id="about" className="relative py-32 bg-[#030303] border-t border-white/10 overflow-hidden">
      {/* Background ambient crimson radial glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#A30A19]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-16">
          <span className="font-mono text-sm tracking-[0.3em] text-[#A30A19]">
            [{config.about.sectionNumber}]
          </span>
          <div className="h-[1px] w-12 bg-[#A30A19]" />
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#929292]">
            About The Creator
          </span>
        </div>

        {/* 2-Column Split: Editorial Typography + Secondary Portrait Frame */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Heading and Prose */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl tracking-tight text-white uppercase leading-[1.08] mb-8">
                THE MIND <span className="text-[#A30A19]">BEHIND</span> THE CODE.
              </h2>

              <div className="space-y-6 text-[#b5b5b5] text-base md:text-lg leading-relaxed font-sans max-w-2xl">
                <p>
                  I&apos;m <span className="text-white font-medium">Allu Kumarswami</span>, a B.Tech student passionate about software development, artificial intelligence, and creative problem-solving.
                </p>
                <p>
                  I&apos;m currently exploring <span className="text-white font-medium">Python programming</span>, <span className="text-white font-medium">web development</span>, and <span className="text-[#A30A19] font-medium">Generative AI</span>.
                </p>
                <p>
                  I enjoy turning ideas into practical projects, participating in hackathons and ideathons, and discovering new ways technology can make an impact.
                </p>
              </div>
            </div>

            {/* Supporting Tagline & Signature Callout */}
            <div className="mt-12 pt-8 border-t border-white/10">
              <blockquote className="font-heading italic text-xl md:text-2xl text-white/90">
                &ldquo;{config.about.tagline}&rdquo;
              </blockquote>
              <div className="mt-4 flex items-center gap-3 text-xs font-mono text-[#929292]">
                <span>Allu Kumarswami</span>
                <span aria-hidden="true">·</span>
                <span>B.Tech First Year</span>
                <span aria-hidden="true">·</span>
                <span className="text-[#A30A19]">Continuous Learner</span>
              </div>
            </div>
          </div>

          {/* Right Column: Secondary Portrait Frame with Crimson Accent Wireframe */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md aspect-[3/4] border border-white/10 group cursor-pointer animate-crimson-aura overflow-hidden">
              {/* Outer decorative corner crosshairs with hover animation */}
              <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#A30A19] z-20 group-hover:scale-125 transition-transform duration-300" />
              <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#A30A19] z-20 group-hover:scale-125 transition-transform duration-300" />
              <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#A30A19] z-20 group-hover:scale-125 transition-transform duration-300" />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#A30A19] z-20 group-hover:scale-125 transition-transform duration-300" />

              <div className="w-full h-full overflow-hidden bg-[#0d0204] relative">
                <img
                  src={config.personal.secondaryPhoto}
                  alt={config.personal.fullName}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover filter contrast-105 group-hover:scale-105 transition-all duration-700 ease-out"
                />

                {/* Laser scan line on hover */}
                <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#ff2a3b] to-transparent shadow-[0_0_15px_#ff2a3b] pointer-events-none opacity-0 group-hover:opacity-100 animate-laser-scan" />
              </div>

              {/* Bottom metadata banner */}
              <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-[#030303] via-[#030303]/85 to-transparent z-10">
                <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#A30A19]">
                  PORTRAIT IDENTIFIER
                </div>
                <div className="font-heading text-sm text-white font-medium tracking-wider">
                  ALLU KUMARSWAMI // NATURAL PROFILE
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
