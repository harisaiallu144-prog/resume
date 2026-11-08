import React, { useState, useRef, useCallback } from 'react';
import { PortfolioConfig } from '../data/portfolioConfig';

interface HeroSceneProps {
  particleData?: unknown;
  config: PortfolioConfig;
  onExploreClick: () => void;
}

export const HeroScene: React.FC<HeroSceneProps> = ({
  config,
  onExploreClick
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, glareX: 50, glareY: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handlePointerMove = useCallback((e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();

    let clientX = 0;
    let clientY = 0;

    if ('touches' in e && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else if ('clientX' in e) {
      clientX = (e as React.MouseEvent).clientX;
      clientY = (e as React.MouseEvent).clientY;
    }

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const normX = (x / rect.width) * 2 - 1;
    const normY = (y / rect.height) * 2 - 1;

    // Max tilt ~15 degrees
    setTilt({
      x: -normY * 12,
      y: normX * 14,
      glareX: (x / rect.width) * 100,
      glareY: (y / rect.height) * 100
    });
  }, []);

  const handlePointerLeave = useCallback(() => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0, glareX: 50, glareY: 50 });
  }, []);

  const handlePointerEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  return (
    <div
      onMouseMove={handlePointerMove}
      onTouchMove={handlePointerMove}
      className="relative w-full h-screen overflow-hidden bg-[#030303] select-none"
    >
      {/* Massive Background Typography: ALLU KUMARSWAMI */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <h1
          className="font-display text-[15vw] md:text-[18vw] leading-none tracking-tighter text-center uppercase text-[#1c080b] opacity-80"
          style={{
            transform: `translateY(-4%) translate(${tilt.y * -0.5}px, ${tilt.x * -0.5}px)`,
            textShadow: '0 0 80px rgba(163, 10, 25, 0.25)',
            transition: 'transform 0.15s ease-out'
          }}
        >
          {config.personal.heroDisplayText}
        </h1>
      </div>

      {/* Cinematic Center Portrait Presentation with 3D Parallax & Animated Layers */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
        <div
          ref={containerRef}
          onMouseEnter={handlePointerEnter}
          onMouseLeave={handlePointerLeave}
          style={{
            perspective: '1200px'
          }}
          className="pointer-events-auto"
        >
          {/* Organic Floating Wrapper */}
          <div className="animate-organic-float">
            {/* 3D Tilted Card Container */}
            <div
              style={{
                transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transformStyle: 'preserve-3d',
                transition: isHovered ? 'transform 0.08s ease-out' : 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
              className="relative w-[310px] h-[420px] sm:w-[350px] sm:h-[480px] md:w-[430px] md:h-[580px] flex items-center justify-center group cursor-pointer"
            >
              {/* Outer Crimson Corner Accent Brackets (Animated Expansion on Hover) */}
              <div
                className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-[#A30A19] shadow-[0_0_15px_#A30A19] transition-transform duration-300 ease-out group-hover:-translate-x-1.5 group-hover:-translate-y-1.5"
                style={{ transform: 'translateZ(25px)' }}
              />
              <div
                className="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 border-[#A30A19] shadow-[0_0_15px_#A30A19] transition-transform duration-300 ease-out group-hover:translate-x-1.5 group-hover:-translate-y-1.5"
                style={{ transform: 'translateZ(25px)' }}
              />
              <div
                className="absolute -bottom-3 -left-3 w-6 h-6 border-b-2 border-l-2 border-[#A30A19] shadow-[0_0_15px_#A30A19] transition-transform duration-300 ease-out group-hover:-translate-x-1.5 group-hover:translate-y-1.5"
                style={{ transform: 'translateZ(25px)' }}
              />
              <div
                className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-[#A30A19] shadow-[0_0_15px_#A30A19] transition-transform duration-300 ease-out group-hover:translate-x-1.5 group-hover:translate-y-1.5"
                style={{ transform: 'translateZ(25px)' }}
              />

              {/* Main Photo Card Frame with Pulsing Crimson Aura */}
              <div className="w-full h-full overflow-hidden border border-white/15 bg-[#070102] relative animate-crimson-aura">
                {/* User Uploaded Portrait */}
                <img
                  src={config.personal.avatarPhoto}
                  alt={config.personal.fullName}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover filter contrast-105 brightness-105 transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Sweeping Crimson Laser Scanline Animation */}
                <div
                  className="absolute left-0 right-0 h-[2.5px] bg-gradient-to-r from-transparent via-[#ff2a3b] to-transparent shadow-[0_0_20px_#ff2a3b] pointer-events-none animate-laser-scan"
                />

                {/* Dynamic Cursor Light Glare / Specular Sheen */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-screen"
                  style={{
                    background: `radial-gradient(circle 280px at ${tilt.glareX}% ${tilt.glareY}%, rgba(255, 60, 80, 0.28), transparent 70%)`
                  }}
                />

                {/* Angled Glass Shimmer Beam on Hover */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="w-full h-[200%] absolute -top-1/2 left-0 bg-gradient-to-b from-transparent via-white/10 to-transparent transform -rotate-45 translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-1000" />
                </div>

                {/* Bottom Scrim & Identity Badge */}
                <div
                  className="absolute bottom-0 inset-x-0 p-5 md:p-6 bg-gradient-to-t from-[#030303] via-[#030303]/85 to-transparent flex items-end justify-between"
                  style={{ transform: 'translateZ(20px)' }}
                >
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#A30A19] flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#A30A19] animate-ping" />
                      <span>PRIMARY IDENTITY</span>
                    </div>
                    <div className="font-heading text-lg md:text-xl text-white font-bold tracking-wider uppercase mt-0.5">
                      {config.personal.fullName}
                    </div>
                    <div className="text-[11px] font-mono text-[#929292]">
                      B.Tech · Aspiring AI Engineer
                    </div>
                  </div>

                  <div className="font-mono text-[10px] text-[#A30A19] uppercase tracking-widest border border-[#A30A19]/50 px-2 py-0.5 bg-black/60">
                    2026
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Atmospheric Vignette & Film Grain */}
      <div className="absolute inset-0 z-15 pointer-events-none bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/60" />
      <div className="absolute inset-0 z-15 pointer-events-none film-grain opacity-20" />

      {/* Upper Right: Clean Brand Metadata */}
      <div className="absolute top-8 right-8 z-20 hidden sm:flex items-center gap-3 text-right pointer-events-none">
        <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#929292] leading-tight">
          AI & SOFTWARE<br />
          <span className="text-[#A30A19]">ALLU KUMARSWAMI</span>
        </div>
      </div>

      {/* Bottom Center: Primary Explore Action Pill Button */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-30 flex flex-col items-center gap-4">
        <button
          onClick={onExploreClick}
          className="group relative px-8 py-3.5 rounded-full border border-[#A30A19] bg-[#030303]/85 backdrop-blur-md text-white font-heading text-xs tracking-[0.25em] uppercase hover:bg-[#A30A19]/25 hover:border-[#ff334b] hover:shadow-[0_0_30px_rgba(163,10,25,0.7)] transition-all duration-300 active:scale-95 cursor-pointer flex items-center gap-3"
          aria-label="Explore portfolio"
        >
          <span className="w-2 h-2 rounded-full bg-[#A30A19] group-hover:bg-[#ff334b] transition-colors" />
          <span>EXPLORE PORTFOLIO →</span>
        </button>

        <button
          onClick={onExploreClick}
          className="text-[10px] font-mono tracking-[0.25em] text-[#929292] hover:text-white uppercase flex items-center gap-2 transition-colors cursor-pointer pt-1"
        >
          <span>Scroll to begin</span>
          <svg className="w-3.5 h-3.5 animate-pulse text-[#A30A19]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
      </div>
    </div>
  );
};
